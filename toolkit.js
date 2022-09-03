const http = require('http');
const https = require('https');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const csrf = require('csurf')
const flash = require('connect-flash');
const bodyParser = require("body-parser");
const sxpApiHelper = require("@types/sxp-api-helper");


const {
    promisify
} = require('util');

const asyncv3 = require('async');


const indexRouter = require('./routes/index');
const serverPort = 8500;
const app = express();
const server = http.createServer(app);
server.listen(serverPort);

//// Web 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(session({
    secret: 'justsomerandomness1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 864000
    }
}));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(csrf());
app.use(flash());

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//// sxpApiHelper
const sxpApi = sxpApiHelper.sxpApi;
const sxpapi = new sxpApi.default();

//// Socket.io

const io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    /* sxp api */
    socket.on('getLastBlock', function() {
        (async() => {
            response = await sxpapi.getLastBlock();
            const data = (response.data);
            const flatJson = {
                height: data.height,
                unix: data.timestamp.unix,
                human: data.timestamp.human
            };
            socket.emit('showLastBlock', flatJson);
        })();

    });
});