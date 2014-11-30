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
    angular.module("GScreen").factory("localDevice", function(Chromecast, sockets) {
        var clearAlert, scheduledAlert, clearTimeoutId, createAlert, exports, listeners, loadChromecast, loadChromecastFromPersistence, updateAlert, updateChannelId, updateChromecast;
        listeners = {
            "change": []
        };
        clearTimeoutId = null;
        loadChromecast = function(id) {
            return Chromecast.get(id).$promise.then(function(c) {
                console.log("loadChromecast", c);
                updateChromecast(c);
                return createAlert(c.alert);
            });
        };
        updateChromecast = function(c) {
            var l, _i, _len, _ref, _results;
            exports.chromecast = c;
            _ref = listeners.change;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                l = _ref[_i];
                _results.push(l(c));
            }
            return _results;
        };
        updateChannelId = function(channelId) {
            var k, newCast, v, _ref;
            newCast = {};
            _ref = exports.chromecast;
            for (k in _ref) {
                v = _ref[k];
                newCast[k] = v;
            }
            newCast.channelId = channelId;
            return updateChromecast(newCast);
        };
        updateAlert = function(alert) {
            var k, newCast, v, _ref;
            newCast = {};
            _ref = exports.chromecast;
            for (k in _ref) {
                v = _ref[k];
                newCast[k] = v;
            }
            newCast.alert = alert;
            return updateChromecast(newCast);
        };
        loadChromecastFromPersistence = function() {
            var id;
            if (id = localStorage.getItem("chromecast-id")) {
                return loadChromecast(id);
            }
        };
        clearAlert = function() {
            console.log("Clearing the alert");
            if (clearTimeoutId) {
                clearTimeout(clearTimeoutId);

                if (scheduledAlert) {
                    createScheduledAlert();
                }
            }
            return updateAlert(null);
        };

        createScheduledAlert = function() {
            if (scheduledAlert) {

                setTimeout(function() {
                    scheduledAlert.expiresAt = new Date().getTime() + (scheduledAlert.duration * 1000);
                    createAlert(scheduledAlert);
                }, scheduledAlert.repeatTime * 1000);
            }
        };

        createAlert = function(alert) {
            var duration;
            if (alert) {
                duration = new Date(alert.expiresAt).getTime() - new Date().getTime();

                if (duration > 0) {
                    updateAlert(alert);
                    console.log("duration", duration);
                    scheduledAlert = alert;
                    clearTimeoutId = setTimeout(clearAlert, Math.ceil(duration));
                    return clearTimeoutId;

                } else {
                    return clearAlert();
                }
            }
        };
        sockets.on("receiver-updated", function(chromecast) {
            if (exports.chromecast.id === chromecast.id) {
                return updateChromecast(chromecast);
            }
        });
        sockets.on("takeover-created", function(takeover) {
            return updateChannelId(takeover.channelId);
        });
        sockets.on("takeover-updated", function(takeover) {
            return updateChannelId(takeover.channelId);
        });
        sockets.on("takeover-deleted", function() {
            return loadChromecastFromPersistence();
        });
        sockets.on("alert-deleted", function() {
            console.log('alert deleted');
            scheduledAlert = null;
            return clearAlert();
        });
        sockets.on("alert-created", function(alert) {
            console.log("Creating alert", alert);
            return createAlert(alert);
        });
        loadChromecastFromPersistence();
        exports = {
            setChromecastId: function(id) {
                loadChromecast(id);
                return localStorage.setItem("chromecast-id", id);
            },
            on: function(event, func) {
                return listeners[event].push(func);
            },
            chromecast: null
        };
        return exports;
    });

}).call(this);
