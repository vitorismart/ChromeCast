ffmpeg = require("fluent-ffmpeg");


module.exports = {
    castVideo: function(req, res, sockets) {
        var data;

        encodeVideo(req.files.video.path, function(data) {
            sockets.emit('cast-video', data);
        }, function(path) {
            console.log("play!");
            sockets.emit("play-video");
            res.end();
        });
    }
};


function encodeVideo(url, onDataFunction, onEndFunction) {
    var command, stream, path;
    path = "public/videos/tmp.webm";
    command = ffmpeg(url)
        .addOptions(["-vcodec vp8", "-g 1"])
        .format("webm")
        .on('start', function(commandLine) {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('error', function(error) {
            console.log('error: ' + error);
        })
        .on('end', function(end) {
            console.log('complete: ' + end);
            //onEndFunction(path);
        });

    stream = command.pipe();

    stream.on("data", function(data) {
        onDataFunction(data);
    });

    stream.on("end", function() {
        onEndFunction();
    });
}


// not in use right now
function castFromFile(path) {
    var readStream = fs.createReadStream(path);

    readStream.addListener('data', function(data) {
        console.log("cast-video emitted");
        sockets.emit('cast-video', data);
    });

    readStream.on('end', function() {
        sockets.emit("play-video");
    });
}