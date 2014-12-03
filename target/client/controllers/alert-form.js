// Generated by CoffeeScript 1.8.0

/*
Copyright (c) 2014, Groupon
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
    angular.module("GScreen").controller("AlertForm", function($scope, $location, $http, flash, Alert, Chromecast) {

        $scope.colors = [{
            code: "106",
            color: "#A0522D"
        }, {
            code: "47",
            color: "#CD5C5C"
        }, {
            code: "87",
            color: "#FF4500"
        }, {
            code: "17",
            color: "#008B8B"
        }, {
            code: "18",
            color: "#B8860B"
        }, {
            code: "68",
            color: "#32CD32"
        }, {
            code: "42",
            color: "#FFD700"
        }, {
            code: "77",
            color: "#48D1CC"
        }, {
            code: "107",
            color: "#87CEEB"
        }, {
            code: "46",
            color: "#FF69B4"
        }, {
            code: "64",
            color: "#87CEFA"
        }, {
            code: "13",
            color: "#6495ED"
        }, {
            code: "15",
            color: "#DC143C"
        }, {
            code: "24",
            color: "#FF8C00"
        }, {
            code: "78",
            color: "#C71585"
        }, {
            code: "123",
            color: "#000000"
        }];

        console.log(Chromecast.session);
        $scope.maxTextLength = 140;
        $scope.alert = {
            style: "#A0522D",
            duration: 60
        };

        $scope.clearAlerts = function() {
            return $http.get("/custom/clearAlerts");
        };

        $scope.onFormSubmit = function() {
            var seconds;
            seconds = $scope.alert.duration;
            $scope.alert.expiresAt = new Date(new Date().getTime() + (seconds * 1000)).toISOString();

            return Alert.save($scope.alert, function() {
                flash.message("Your alert has been saved.");
                return $location.url("/");
            });
        };

    });
}).call(this);
