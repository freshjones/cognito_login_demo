(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/login.tpl.html',
    '<form ng-submit="save()">\n' +
    '	<input type="text" name="email" ng-model="user.email" placeholder="email address" />\n' +
    '	<input type="password" name="password" ng-model="user.password" placeholder="password" />\n' +
    '	<input type="submit" value="Go" />\n' +
    '</form>');
}]);
})();
