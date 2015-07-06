!function(){"use strict";angular.module("mercuryStats",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","mgcrea.ngStrap"])}(),function(){"use strict";function t(){function t(){return a}var a=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular Strap",url:"http://mgcrea.github.io/angular-strap/",description:"AngularJS 1.2+ native directives for Bootstrap 3.",logo:"angular-strap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("mercuryStats").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var a=this;a.relativeDate=t(a.creationDate).fromNow()}var a={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],a}angular.module("mercuryStats").directive("acmeNavbar",t)}(),function(){"use strict";function t(t){function a(a,r,e,n){var o,i=t(r[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!1,postfix:" "});r.addClass("acme-malarkey"),angular.forEach(a.extraValues,function(t,a){1==a?i.type(t).pause():i.type(t).pause()["delete"]()}),a.$on("$destroy",function(){o()})}function r(t,a){function r(){return e().then(function(){t.info("Activated Contributors View")})}function e(){return a.getContributors(10).then(function(t){return n.contributors=t,n.contributors})}var n=this;n.contributors=[],r()}var e={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:a,controller:r,controllerAs:"vm"};return r.$inject=["$log","githubContributor"],e}angular.module("mercuryStats").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(t,a){function r(r){function n(t){return t.data}function o(a){t.error("XHR Failed for getContributors.\n"+angular.toJson(a.data,!0))}return r||(r=30),a.get(e+"/contributors?per_page="+r).then(n)["catch"](o)}var e="https://api.github.com/repos/Swiip/generator-gulp-angular",n={apiHost:e,getContributors:r};return n}angular.module("mercuryStats").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,a,r,e,n){function o(){s(),t(function(){u.classAnimation="rubberBand"},4e3)}function i(){r.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),u.classAnimation=""}function s(){u.awesomeThings=a.getTec(),angular.forEach(u.awesomeThings,function(t){t.rank=Math.random()})}var u=this;u.awesomeThings=[],u.classAnimation="",u.creationDate=1436210737524,u.showToastr=i;var l="app/mocks/stats.json";o(),u.bathrooms={},e.get(l).success(function(t){var a={},r={};angular.forEach(t,function(e,n){var o=e.msg.split(" "),i=o[0],s=o[1];"hi"!=i&&(a[i]||(a[i]=[],r[i]=[],u.bathrooms[i]=[]),angular.equals(e.time.slice(0,-4),t[n-1].time.slice(0,-4))||(e.status=s,a[i].push(e)))}),angular.forEach(a,function(t,a){angular.forEach(t,function(e,n){if(0===n||!angular.equals(e.status,t[n-1].status)){if("busy"==e.status){e.timestamp=new Date(e.time).getTime();var o=new Date(t[n+1].time).getTime();if(isNaN(o))return;e.duration=o-e.timestamp}r[a].push(e)}})}),angular.forEach(r,function(t,a){angular.forEach(t,function(r,e){if((0===e||!angular.equals(r.status,t[e-1].status))&&"busy"==r.status){r.timestamp=new Date(r.time).getTime();var n=new Date(t[e+1].time).getTime(),o=n-r.timestamp;if(isNaN(n)||!o||6e3>o)return;r.duration=n-r.timestamp,u.bathrooms[a].push(r)}})})})}angular.module("mercuryStats").controller("MainController",t),t.$inject=["$timeout","webDevTec","toastr","$http","$filter"]}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("mercuryStats").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t,a){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),a.otherwise("/")}angular.module("mercuryStats").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("mercuryStats").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,a){t.debugEnabled(!0),a.options.timeOut=3e3,a.options.positionClass="toast-top-right",a.options.preventDuplicates=!0,a.options.progressBar=!0}angular.module("mercuryStats").config(t),t.$inject=["$logProvider","toastr"]}(),angular.module("mercuryStats").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="container"><div class="jumbotron text-center"><p>Welcome to<acme-malarkey extra-values="[\'Project Mercury\', \'O3 Poops\']"></acme-malarkey></p></div><div class="row"><div class="col-xs-12 col-sm-12"><ul class="row"><li ng-repeat="(key, bathroom) in main.bathrooms" class="col-xs-12 col-sm-4"><h2>{{key}}</h2><ul><li ng-repeat="trip in bathroom | orderBy : \'-time\' track by $index"><h4>{{trip.duration | date : \'mm:ss\'}} <small>{{trip.time | date}}</small></h4></li></ul></li></ul></div></div></div>'),t.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul></div></div></nav>')}]);