(function() {
    angular.module("GScreen").controller("Video", function($scope, castAway, CONFIG, $http, feedLoader, $sce) {
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

        $scope.test = function() {
            return $http.get("/custom/testVideo");
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

        $scope.videoFileClick = function(event) {
        	console.log(event);
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

    
        // feedLoader.loadFeed("http://rmurphey.com/atom.xml",function(data) {
        //     $scope.feed = data.responseData.feed;
        //     var entries = $scope.feed.entries;
        //     entries.forEach(function(entry){
        //         entry.contentHTML = $sce.trustAsHtml(entry.content);
        //     });

        // });

    });

}).call(this);
