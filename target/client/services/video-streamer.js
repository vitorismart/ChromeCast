(function() {
    angular.module("GScreen").factory("videoStreamer", function(sockets) {

        function initVideoElement(videoElement, showVideoElementCallback) {
            window.URL = window.URL || window.webkitURL;
            window.MediaSource = window.MediaSource || window.WebKitMediaSource;

            var mediaSource = new MediaSource();
            var queue = [];
            var sourceBuffer;
            var firstChunk = true;
            videoElement.src = window.URL.createObjectURL(mediaSource);

            streamIt = function(e) {
                videoElement.pause();
                sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
                var onBufferUpdated = function() {
                    appendSegmentOfData();
                };

                sockets.on("cast-video", function(data) {
                    showVideoElementCallback();
                    var uIntArray = new Uint8Array(data);
                    console.log("received from server");
                    queue.push(uIntArray);
                });

                sockets.on("play-video", function() {
                    sourceBuffer.addEventListener('updateend', onBufferUpdated);
                    appendSegmentOfData();
                });
            };

            function appendSegmentOfData() {
                console.log("called the callback");
                if (queue.length) {
                    console.log("appended to buffer");
                    sourceBuffer.appendBuffer(queue.shift());
                }else{
                    videoElement.play();
                }
            }
            mediaSource.addEventListener('sourceopen', streamIt);
            mediaSource.addEventListener('webkitsourceopen', streamIt);
        }

        exports = {
            initVideoElement: initVideoElement
        };

        return exports;
    });

}).call(this);
