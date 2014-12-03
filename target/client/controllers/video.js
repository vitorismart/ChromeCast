(function() {
    angular.module("GScreen").controller("Video", function($scope, Chromecast) {


        var media = {
            "description": "what car can you get for a grand",
            "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            "subtitle": "By Garage419",
            "thumb": "images/WhatCarCanYouGetForAGrand.jpg",
            "title": "What care can you get for a grand?",
            "contentType": "video/mp4"
        };



        $scope.castUrl = function() {
            url = $scope.video.url;

            session = Chromecast.session;
            if (session) {
                castVideo(url, session);
            }
        };

        castVideo = function(url, session) {
            console.log(url);

            var mediaInfo = new chrome.cast.media.MediaInfo(media.source);

            mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
            mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
            mediaInfo.contentType = media.contentType;

            var request = session.load(mediaInfo);
        };

    });

}).call(this);
