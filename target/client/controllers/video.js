(function() {
    angular.module("GScreen").controller("Video", function($scope, Chromecast, CONFIG) {
        var castAway = new CastAway({
            applicationID: CONFIG.chromecastApplicationId,
            namespace: "urn:x-cast:json"
        });

        castAway.initialize(function(err, data) {
            if (err) {
                return console.log("error initialized", err);
            } else {
                return console.log("initialized", data);
            }
        });


        var media = {
            "description": "what car can you get for a grand",
            "source": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            "subtitle": "By Garage419",
            "thumb": "images/WhatCarCanYouGetForAGrand.jpg",
            "title": "What care can you get for a grand?",
            "contentType": "video/mp4"
        };


        onSuccess = function() {
            console.log("yay!");
        };

        onError = function() {
            console.log("ah");
        };

        castAway.on("receivers:available", function() {
            castAway.requestSession(function(err, session) {

                if (err) {
                    return console.log("Error getting session", err);
                }

                var mediaInfo = new chrome.cast.media.MediaInfo(media.source);

                mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
                mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
                mediaInfo.contentType = media.contentType;

                window.session = session;
                session.load(mediaInfo);
                console.log(session);
            });
        });



    });

}).call(this);
