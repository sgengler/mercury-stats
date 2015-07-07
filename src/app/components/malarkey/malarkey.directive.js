(function() {
  'use strict';

  angular
    .module('mercuryStats')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '=',
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 60,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: false,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function(value, index) {
        if(index == 1) {
          typist.type(value).pause();
        } else {
          typist.type(value).pause().delete();
        }
        
      });
    }

    /** @ngInject */
    function MalarkeyController($log) {
      var vm = this;

    }

  }

})();
