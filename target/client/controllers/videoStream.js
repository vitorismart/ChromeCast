//ATTEMPT TO STREAM VIDEOS STRAIGHT TO HTML5 PLAYER, FAR FROM WORK.

(function() {
    angular.module("GScreen").controller("VideoStram", function($scope) {
        var videoFile, mediaSource;

        handleFileEvent = function(evt) {
            files = event.target.files;
            fileInput = files[0];
            var reader = new FileReader();

            reader.onload = function(file) {
                return function(e) {
                    videoFile = file;
                    loadMedia();
                };
            }(fileInput);

            reader.readAsArrayBuffer(fileInput);
        };
        $scope.handleFileEvent = handleFileEvent;


        loadMedia = function() {
            var video = document.getElementById('video');
            mediaSource = new MediaSource();
            mediaSource.addEventListener('sourceopen', onMediaOpen);
            video.src = window.URL.createObjectURL(mediaSource);
        };

        function onMediaOpen(e) {
            var sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
            var chunkSize = Math.ceil(videoFile.size / 5);

            for (var i = 0; i <= 4; i++) {

                startByte = 1 * chunkSize;
                chunk = videoFile.slice(startByte, startByte + chunkSize);
                sourceBuffer.appendBuffer(new Uint8Array(videoFile));
                if (video.paused) {
                   video.play(); // Start playing after 1st chunk is appended.
                }
            }


        }

    });

}).call(this);
