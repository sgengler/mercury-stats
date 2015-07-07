!function(){"use strict";angular.module("mercuryStats",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","mgcrea.ngStrap","nvd3"])}(),function(){"use strict";function t(){function t(t){var a=this;a.relativeDate=t(a.creationDate).fromNow()}var a={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],a}angular.module("mercuryStats").directive("acmeNavbar",t)}(),function(){"use strict";function t(){function t(){return a}var a=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular Strap",url:"http://mgcrea.github.io/angular-strap/",description:"AngularJS 1.2+ native directives for Bootstrap 3.",logo:"angular-strap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("mercuryStats").service("webDevTec",t)}(),function(){"use strict";function t(t){function a(a,e,r,o){var n=t(e[0],{typeSpeed:60,deleteSpeed:40,pauseDelay:800,loop:!1,postfix:" "});e.addClass("acme-malarkey"),angular.forEach(a.extraValues,function(t,a){1==a?n.type(t).pause():n.type(t).pause()["delete"]()})}function e(t){}var r={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:a,controller:e,controllerAs:"vm"};return e.$inject=["$log"],r}angular.module("mercuryStats").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(t,a,e){var r=this;r.awesomeThings=[],r.classAnimation="",r.creationDate=1436210737524;var o="app/mocks/stats.json";r.bathrooms={};var n=function(t){var a={},e={};angular.forEach(t,function(o,n){var s=o.msg.split(" "),i=s[0],l=s[1];"hi"!=i&&(a[i]||(a[i]=[],e[i]=[],r.bathrooms[i]=[]),angular.equals(o.time.slice(0,-4),t[n-1].time.slice(0,-4))||(o.status=l,a[i].push(o)))}),angular.forEach(a,function(t,a){angular.forEach(t,function(r,o){if(0===o||!angular.equals(r.status,t[o-1].status)){if("busy"==r.status){r.timestamp=new Date(r.time).getTime();var n=new Date(t[o+1].time).getTime();if(isNaN(n))return;r.duration=n-r.timestamp}e[a].push(r)}})}),angular.forEach(e,function(t,a){angular.forEach(t,function(e,o){if((0===o||!angular.equals(e.status,t[o-1].status))&&"busy"==e.status){e.timestamp=new Date(e.time).getTime();var n=new Date(t[o+1].time).getTime(),s=n-e.timestamp;if(isNaN(n)||!s||6e3>s)return;e.duration=n-e.timestamp,r.bathrooms[a].push(e)}})})},s=function(){a.get(o).success(n)};s()}angular.module("mercuryStats").controller("MainController",t),t.$inject=["$timeout","$http","$filter"]}(),function(){"use strict";function t(t){}angular.module("mercuryStats").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t,a){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),a.otherwise("/")}angular.module("mercuryStats").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("mercuryStats").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,a){t.debugEnabled(!0),a.options.timeOut=3e3,a.options.positionClass="toast-top-right",a.options.preventDuplicates=!0,a.options.progressBar=!0}angular.module("mercuryStats").config(t),t.$inject=["$logProvider","toastr"]}(),function(){"use strict";angular.module("mercuryStats").filter("bathroomName",function(){return function(t){t=t||"";var a={O3WestBathroom1:"O3 West #1",O3WestBathroom2:"O3 West #2",O3EastBathroom:"O3 East"};return a[t]?a[t]:t}})}(),angular.module("mercuryStats").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="container"><div class="jumbotron text-center"><h2>Welcome to<acme-malarkey extra-values="[\'Project Mercury\', \'O3 Poops\']"></acme-malarkey></h2></div><div class="row"><div class="col-xs-12 col-sm-12"><div class="row"><div ng-repeat="(key, bathroom) in main.bathrooms" class="col-xs-12 col-sm-4"><h2>{{key | bathroomName}}</h2><ul class="list-group"><li ng-repeat="trip in bathroom | orderBy : \'time\' track by $index" class="list-group-item"><h4>{{trip.time | date : \'hh:mm a\'}} <small>busy {{trip.duration | date : \'mm:ss\'}}</small></h4></li></ul></div></div></div></div></div>'),t.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul></div></div></nav>')}]);