// // app.js
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
//
// app.use(express.static(__dirname + '/node_modules'));
// app.get('/', function(req, res,next) {
//     res.sendFile(__dirname + '/index.html');
// });
//
// var url = 'mongodb://mshipper1:12345678@ds129090.mlab.com:29090/mshipper';
// var multer = require('multer');
//
// var mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect(url);
// var dbMongo = mongoose.connection;
// dbMongo.on('error', console.error.bind(console, 'connection error:'));
// dbMongo.once('open', function () {
//     console.log('MongoDb connect');
// });
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
//
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
//
// repHttp = function (success, message) {
//     return {success: success, message: message};
// }
//
// var Locations = require('./models/Locations');
// io.on('connection', function (client) {
//     console.log('Client connected...');
//
//     client.on('join', function (data) {
//
//         client.join('room1');
//         console.log(data);
//     });
//
//     client.on('messages', function (data) {
//         console.log(JSON.parse(data));
//
//         // var newLocation = new Locations(JSON.parse(data));
//         // newLocation.save(function (err) {
//         //     if (err) {
//         //         console.log('Location error!');
//         //     }
//         //     else {
//         //         console.log('Location created!');
//         //     }
//         // });
//         //Dòng này có tác dụng trả thông tin về những client trong room1
//         // Nếu mất comment đi, thì client chỉ có gửi, chứ không có nhận, như vậy sẽ nhanh hơn.
//         client.broadcast.to('room1').emit('broad', data);
//     });
// });
//
// //port socket
// server.listen(6969);
//
// //port express
// // app.listen(1111, function () {
// //     console.log('connect thanh cong');
// // });
//
// module.exports = app;

//////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 5000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
    .use((req, res) => res.sendFile(INDEX) )
.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function (client) {
    console.log('Client connected...');

    client.on('join', function (data) {

        client.join('room1');
        console.log(data);
    });

    client.on('messages', function (data) {
        console.log(data);

        // var newLocation = new Locations(JSON.parse(data));
        // newLocation.save(function (err) {
        //     if (err) {
        //         console.log('Location error!');
        //     }
        //     else {
        //         console.log('Location created!');
        //     }
        // });
        //Dòng này có tác dụng trả thông tin về những client trong room1
        // Nếu mất comment đi, thì client chỉ có gửi, chứ không có nhận, như vậy sẽ nhanh hơn.
        client.broadcast.to('room1').emit('broad', data);
    });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);