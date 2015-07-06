(function() {
  'use strict';

  angular
    .module('mercuryStats')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $http, $filter) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1436210737524;
    vm.showToastr = showToastr;

    var statsUrl = "/app/mocks/stats.json";

    activate();

    vm.bathrooms = {}

    $http.get(statsUrl).success(function(data){
      var bathrooms = {};
      var orderedBathrooms = {};

      angular.forEach(data, function(value, index){
        var msg = value.msg.split(' ');
        var br = msg[0];
        var status = msg[1];
        if(br == 'hi') {return}
        if(!bathrooms[br]) {
          bathrooms[br] = [];
          orderedBathrooms[br] = [];
          vm.bathrooms[br] = [];
        }
        if( angular.equals(value.time.slice(0, -4), data[index -1].time.slice(0, -4))) {
          return;
        }
        value.status = status;
        bathrooms[br].push(value);
      });

      angular.forEach(bathrooms, function(trips, bathroomIndex){
        angular.forEach(trips, function(trip, tripIndex){
          if(tripIndex !== 0 && angular.equals(trip.status, trips[tripIndex -1].status)) {
            return;
          }

          if(trip.status == 'busy'){
            trip.timestamp = new Date(trip.time).getTime();
            var leaveTime = new Date(trips[tripIndex + 1].time).getTime();
            if(isNaN(leaveTime)) {
              return;
            }
            trip.duration = leaveTime - trip.timestamp;
          }
          orderedBathrooms[bathroomIndex].push(trip);
        })
      })

      angular.forEach(orderedBathrooms, function(trips, bathroomIndex){
        angular.forEach(trips, function(trip, tripIndex){
          if(tripIndex !== 0 && angular.equals(trip.status, trips[tripIndex -1].status)) {
            return;
          }

          if(trip.status == 'busy'){
            trip.timestamp = new Date(trip.time).getTime();
            var leaveTime = new Date(trips[tripIndex + 1].time).getTime();
            if(isNaN(leaveTime)) {
              return;
            }
            trip.duration = leaveTime - trip.timestamp;
            vm.bathrooms[bathroomIndex].push(trip);
          }
          
        })
      })

      console.log(vm.bathrooms);
    })

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
