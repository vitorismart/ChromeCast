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
  GScreen.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl: '/templates/main.html'
    });
    $routeProvider.when("/channels", {
      templateUrl: "/templates/channels/index.html"
    });
    $routeProvider.when("/channels/new", {
      templateUrl: "/templates/channels/new.html"
    });
    $routeProvider.when("/channels/:id/edit", {
      templateUrl: "/templates/channels/edit.html"
    });
    $routeProvider.when("/chromecasts", {
      templateUrl: "/templates/chromecasts/index.html"
    });
    $routeProvider.when("/alert", {
      templateUrl: "/templates/alert/index.html"
    });
    $routeProvider.when("/takeover", {
      templateUrl: "/templates/takeover/index.html"
    });
    $routeProvider.when("/chromecasts/new", {
      templateUrl: "/templates/chromecasts/new.html"
    });
    $routeProvider.when("/chromecasts/:id/edit", {
      templateUrl: "/templates/chromecasts/edit.html"
    });
    return $locationProvider.html5Mode(true);
  });

}).call(this);
