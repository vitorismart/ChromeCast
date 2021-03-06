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
  angular.module("GScreen").controller("TakeoverForm", function($scope, flash, Channel, Takeover) {
    $scope.takeover = Takeover.get();
    $scope.channels = Channel.query();
    $scope.onFormSubmit = function() {
      return Takeover.save($scope.takeover, function(t) {
        var channel, _base;
        if ((_base = $scope.takeover).id == null) {
          _base.id = t.id;
        }
        channel = _($scope.channels).detect(function(ch) {
          return ch.id === $scope.takeover.channelId;
        });
        return flash.message("The '" + channel.name + "' channel has taken over.");
      });
    };
    return $scope.onStop = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      return Takeover.remove($scope.takeover, function() {
        $scope.takeover = {};
        return flash.message("The takeover has stopped.");
      });
    };
  });

}).call(this);
