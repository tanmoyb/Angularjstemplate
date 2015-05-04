(function() {
var app=angular.module('Store', ['ngRoute','UserValidation']);
app.config(function($routeProvider){
    $routeProvider.when('/',{templateUrl: 'partials/home.html'}).
    when('/login',{templateUrl:'partials/login.html', controller:'loginController'}).
    when('/singleView/:id',{templateUrl:'partials/singleView.html',controller:'viewController'}).
    when('/register', {templateUrl:'partials/register.html', controller:"registerController"}).
    when('/shirts', {templateUrl:'partials/shirt.html', controller: 'shirtController'}).
    when('/cart', {templateUrl:'partials/cart.html', controller:'cartController'}).
    when('/singleView/shirt/:id',{templateUrl:'partials/shirtSingleView.html', controller:'shirtSingleViewController'}).when('/contact',{templateUrl:'partials/contact.html'}).when('/faq', {templateUrl:'partials/faq.html'}).when('/orderWay',{templateUrl:'partials/orderWay.html'}).when('/working',{templateUrl:'partials/working.html'});
});
app.factory('Scopes', function ($rootScope) {
    var mem = {};
 
    return {
        store: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});

 app.controller('StoreController', function($scope,$http,Scopes){
    $http.get('hotItem.json').success(function(data){
        $scope.products=data
    });
    Scopes.store('products', $scope);
 }); 
 app.controller('viewController', function($scope,$routeParams,Scopes){
    if (typeof Scopes.get('products') !== 'undefined') {
        $scope.products = Scopes.get('products').products;
        $scope.product=$scope.products[$routeParams.id]
       localStorage.setItem('product', JSON.stringify($scope.product));
       
    }
    else{
        $scope.product=JSON.parse(localStorage.getItem('product'));
         
     }
       $scope.addItem = function() {
        if(localStorage.getItem('cart')){
            var cart=new Array();
            cart=JSON.parse(localStorage.getItem('cart'));
            cart.push($scope.product);
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
           var cart=new Array();
            cart.push($scope.product);
            localStorage.setItem('cart', JSON.stringify(cart));
           }
    }
 });   
app.controller('loginController', function($scope){
    $scope.submit=function(){
        alert($scope.name+$scope.password);
    };
});
app.controller('registerController', function($scope){
    $scope.submit=function(){
        alert($scope.formData.email+$scope.formData.password+$scope.formData.name);
       
    };

});
app.controller('shirtController', function($scope,$http,Scopes){
      $http.get('bracelet.json').success(function(data){
        $scope.products=data
    });
    Scopes.store('shirts', $scope);
});
app.controller('cartController', function($scope){
    $scope.products=JSON.parse(localStorage.getItem('cart'));
});
app.controller('shirtSingleViewController',function($scope,$routeParams,Scopes){
    if (typeof Scopes.get('shirts') !== 'undefined') {
        $scope.products = Scopes.get('shirts').products;
        $scope.product=$scope.products[$routeParams.id]
       localStorage.setItem('shirts', JSON.stringify($scope.product));
       
    }
    else{
        $scope.product=JSON.parse(localStorage.getItem('shirts'));
         
     }
       $scope.addItem = function() {
        if(localStorage.getItem('cart')){
            var cart=new Array();
            cart=JSON.parse(localStorage.getItem('cart'));
            cart.push($scope.product);
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
           var cart=new Array();
            cart.push($scope.product);
            localStorage.setItem('cart', JSON.stringify(cart));
           }
    }
    
});
angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.myForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})
})();