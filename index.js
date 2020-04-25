const express = require('express');
const app = express();
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
const cookieSession = require('cookie-session');
const csurf = require("csurf");
const s3 = require("./s3");
const compression = require('compression');
const server = require('http').Server(app);

const io = require('socket.io')(server);

app.use(express.json());
app.use(compression());
app.use(express.static("./public"));

const cookieSessionMiddleware = (cookieSession({
    secret: process.env.NODE_ENV == 'production' ?
        process.env.SESSION_SECRET : require("./secrets").SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 13365
}));

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

// FILE UPLOAD
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    //makes name of each file uniqe so we don't owerwrite any file that might have the same name
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 3097152
    }
});

// //

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/welcome", (req, res) => {
    hash(req.body.password).then(hash => {
        const {first, last, email} = req.body;
        db.reg(first, last, email, hash).then( ()=> {
            res.json(true);
        }).catch(err => {
            res.json(false);
            console.log("err2", err);
        });
    }).catch(err => {
        res.json(false);
        console.log("err3", err);
    });
});

app.post("/login", (req, res) => {
    db.passCheck(req.body.email)
        .then(check => {
            compare(req.body.password, check[0].password).then(match => {
                if (match === true) {
                    req.session.uid = check[0].id;
                    res.json(true);}
                else {
                    res.json(false);
                }
            }).catch(err => {
                res.json(false);
                console.log("err4", err);
            });
        }).catch(err => {
            res.json(false);
            console.log("err5", err);
        });

});


app.get("/cookiecheck", (req, res) => {
    if (!req.session.uid) {
        res.json(false);
    } else {
        res.json(true);
    }
});


app.get("/user", (req, res) => {
    if (req.session.uid === "undefined") {
        res.redirect("/welcome");
    } else {
        db.getInfo(req.session.uid)
            .then(data =>
                res.json(data)).catch(err => {
                console.log("err6", err);

            });
    }
});

app.post("/bio", (req, res) => {
    db.sndBio(req.session.uid, req.body.bioDraft)
        .then(data => {
            console.log(data);
            res.json(data);}).catch(err => {
            console.log("err7", err);
        });
});


app.get('/api/user/:id', (req, res) => {
    if (req.params.id == req.session.uid) {
        db.getInfo(0)
            .then(data =>
                res.json(data))
            .catch(err => {
                console.log("error in other db req", err);
            });
    } else {
        db.getInfo(req.params.id)
            .then(data =>
                res.json(data))
            .catch(err => {
                console.log("error in other db req", err);
            });
    }
});

app.get("/firstnine", (req, res) => {
    db.getNine()
        .then(data =>
            res.json(data)).catch(err => {
            console.log("err8", err);
        });
});

app.get("/match/:search", (req, res) => {
    db.getMatch(req.params.search)
        .then(data =>
            res.json(data)).catch(err => {
            console.log("err9", err);
        });
});

app.post('/uploadpropic', uploader.single('file'), s3.upload, (req, res) => {
    const {filename} = req.file;
    const prourl = "https://s3.amazonaws.com/socmedpropic/" + filename;
    if (req.file) {
        db.sndProPic(req.session.uid, prourl)
            .then(data => {
                console.log("data", data);
                req.session.prourl = data[0].prourl;
                res.json(data);
            }).catch(err => {
                console.log("err10", err);
            });

    } else {
        return;
    }
});

app.get("/frndchck/:oid", (req, res) => {
    db.getStatus(req.session.uid, req.params.oid)
        .then( data => {
            if (data && data.length) {
                if (data[0].acc == false) {
                    if (data[0].sid == req.session.uid) {
                        res.json({button : "Cancel request"});
                    } else { res.json({button : "Accept friendship"}); }
                } else { res.json({button : "End frienship"}); }
            } else { res.json({button : "Add friend"});}}
        ).catch( err => { console.log("err747", err);
        });
});

app.post("/addit/:oid", (req, res) => {
    db.addFr(req.session.uid, req.params.oid)
        .then( res.json({button : "Cancel request"})
        ).catch(err => {
            console.log("err12", err);
        });
});

app.post("/cancel/:oid", (req, res) => {
    db.delFr(req.session.uid, req.params.oid)
        .then( res.json({button : "Add friend"})
        ).catch(err => {
            console.log("err13", err);
        });
});

app.post("/accept/:oid", (req, res) => {
    db.accFr(req.session.uid, req.params.oid)
        .then( res.json({button : "End frienship"})
        ).catch(err => {
            console.log("err14", err);
        });
});

app.get("/frieeends", (req, res) => {
    db.getFrieee(req.session.uid)
        .then(data =>
            res.json(data)).catch(err => {
            console.log("err15", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.json(true);
});


app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket) {
    if (!socket.request.session.uid) {
        return socket.disconnect(true);
    }

    db.getTwenty()
        .then(data => {
            let atad = data.reverse();
            io.sockets.emit('InitialMsgsForSocket', atad);})
        .catch(err => {
            console.log("err97", err);
        });

    socket.on("NewMsgForIndex", (msg) => {
        db.getInfo(socket.request.session.uid)
            .then(userData => {
                db.sendOne(socket.request.session.uid, msg)
                    .then( msgData => {
                        io.sockets.emit('NewMsgforSocket', {
                            id: userData[0].id,
                            first: userData[0].first,
                            last: userData[0].last,
                            prourl: userData[0].prourl,
                            msg: msgData[0].msg,
                            created_at: msgData[0].created_at }
                        );}
                    ).catch(err => {
                        console.log("err98", err);});}
            ).catch(err => {
                console.log("err99", err);});
    });
});

server.listen(process.env.PORT || 8080, function() {
    console.log("Omicron Persei 8080");
});
