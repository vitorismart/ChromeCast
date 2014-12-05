(function() {
    angular.module("GScreen").controller("Video", function($scope, castAway, CONFIG, $http) {
        var mediaControls;
        castAway.initialize();

        var media = {
            "description": "what car can you get for a grand",
            "source": "file://c:/big-buck-bunny_trailer.webm",
            //"source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            "subtitle": "By Garage419",
            "thumb": "images/WhatCarCanYouGetForAGrand.jpg",
            "title": "What care can you get for a grand?",
            "contentType": "video/webm"
        };


        $scope.cast = function() {

            var mediaInfo = new chrome.cast.media.MediaInfo(media.source);

            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
            mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
            mediaInfo.contentType = media.contentType;

            window.session.load(mediaInfo, function(data) {
                mediaControls = data;
            });


        };

        $scope.stop = function() {
            if (mediaControls) {
                mediaControls.stop();
            }
        };

        $scope.stream = function() {
            console.log("starting stream");
            return $http.get("/custom/castVideo");
        };
    });

}).call(this);
