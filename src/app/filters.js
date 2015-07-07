(function() {
  'use strict';

  angular
    .module('mercuryStats')
    
    .filter('bathroomName', function() {
      return function(str) {
        str = str || '';
        
        var names = {
          O3WestBathroom1: "O3 West #1",
          O3WestBathroom2: "O3 West #2",
          O3EastBathroom: "O3 East"
        }
        return names[str] ? names[str] : str;
      };
    })

})();
