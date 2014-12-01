(function() {
  angular.module("GScreen").directive("colorPicker", function(flash) {
    return {
      transclude: false,
      restrict: "E",
      replace: true,
      template: "<div id='alerts'></div>",
      link: function(scope, element, attrs) {
        return flash.on("message", function(msg) {
          var el, remove;
          el = $("<div class='flash-msg'>" + msg + "</div>");
          $(element).append(el);
          remove = function() {
            return el.remove();
          };
          return setTimeout(remove, 5000);
        });
      }
    };
  });

}).call(this);
