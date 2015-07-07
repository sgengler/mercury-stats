(function() {
  'use strict';

  angular
    .module('mercuryStats')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $http, $filter) {
    var self = this;

    self.awesomeThings = [];
    self.classAnimation = '';
    self.creationDate = 1436210737524;

    var statsUrl = "app/mocks/stats.json";

    self.bathrooms = {}


    var parseData = function(data) {
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
          self.bathrooms[br] = [];
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
            var duration = leaveTime - trip.timestamp;
            if(isNaN(leaveTime) || !duration || duration < (6000)) {
              return;
            }
            trip.duration = leaveTime - trip.timestamp;
            self.bathrooms[bathroomIndex].push(trip);
          }
          
        })
      })
    }

    var getData = function() {
      $http.get(statsUrl).success(parseData);
    }

    getData();

    


  }
})();
