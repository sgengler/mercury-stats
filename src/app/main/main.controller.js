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

        var setChartData = function(bathrooms) {
            var chartData = [];

            angular.forEach(bathrooms, function(bathrooms, index){
                var trips = [];

                angular.forEach(bathrooms, function(trip, tripIndex){
                    var date = new Date(trip.time).getTime();

                    if(trip.duration < 1200000) {
                        trips.push([date, trip.duration]);
                    }
                    
                })

                var bathroom = {
                    key: index,
                    values: trips,
                    area: true
                }

                if(index == "O3WestBathroom1") {
                    chartData.push(bathroom);
                }
                
            });

            console.log(chartData);
            self.data = chartData;

        }

        var setBarChart = function(bathrooms) {
            var chartData = [];

            angular.forEach(bathrooms, function(bathrooms, index){
                var trips = [];

                angular.forEach(bathrooms, function(trip, tripIndex){
                    var date = new Date(trip.time).getTime();

                    if(trip.duration < 1200000) {
                        trips.push([date, trip.duration]);
                    }
                    
                })

                var bathroom = {
                    key: index,
                    values: trips,
                    area: true
                }

                chartData.push(bathroom);
                
            });

            console.log(chartData);
            self.data = chartData;

        }


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
			});

            setChartData(self.bathrooms);
		}

		var getData = function() {
			$http.get(statsUrl).success(parseData);
		}


		getData();

        self.options = {
           chart: {
               type: 'discreteBarChart',
               height: 450,
               margin : {
                   top: 20,
                   right: 20,
                   bottom: 60,
                   left: 40
               },
               x: function(d){return d[0];},
               y: function(d){return d[1];},
               useVoronoi: false,
               clipEdge: true,
               transitionDuration: 1000,
               useInteractiveGuideline: false,
               interpolate: "basis",
               showLegend: false,
               xAxis: {
                   showMaxMin: false,
                   tickFormat: function(d) {
                       return '';
                   }
               },
               yAxis: {
                   tickFormat: function(d){
                       return d3.time.format('%M:%S')(new Date(d))
                   }
               }
           }
       };

        self.data2 = [
            {
                "key" : "North America" ,
                "values" : []
            }

        ]

		


	}
})();
