(function() {
    'use strict';

    angular
        .module('pteMagicApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', 'LoginService', '$scope', '$timeout'];

    function NavbarController ($state, Auth, Principal, ProfileService, LoginService, $scope, $timeout) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });
        vm.user;
        vm.login = login;
        vm.logout = logout;
        vm.register = register;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.loggedIn = false;
        vm.notloggedIn = false;
        vm.$state = $state;
        
        // Properties & function declare
  		vm.menuProduct = [
  			{
  				"id": 1,
  				"code": "CAR",
  				"name" : "Bảo hiểm ô tô",
  				"sref": "product.car"
  			},
  			{
  				"id": 2,
  				"code": "BVP",
  				"name" : "Bảo hiểm bảo việt an gia",
  				"sref": "product.bvp"
  			},
  			{
  				"id": 3,
  				"code": "KCARE",
  				"name" : "Bảo hiểm bệnh ung thư",
  				"sref": "product.kcare"
  			},
  			{
  				"id": 4,
  				"code": "TVC",
  				"name" : "Bảo hiểm du lịch quốc tế",
  				"sref": "product.tvc"
  			},
  			{
  				"id": 5,
  				"code": "TVI",
  				"name" : "Bảo hiểm du lịch Việt Nam",
  				"sref": "product.tvi"
  			},
  			{
  				"id": 6,
  				"code": "MOTO",
  				"name" : "Bảo hiểm xe máy",
  				"sref": "product.moto"
  			},
  			{
  				"id": 7,
  				"code": "HOME",
  				"name" : "Bảo hiểm nhà tư nhân",
  				"sref": "product.home"
  			},
  			{
  				"id": 8,
  				"code": "KHC",
  				"name" : "Bảo hiểm kết hợp con người",
  				"sref": "product.khc"
  			},
  			{
  				"id": 9,
  				"code": "TNC",
  				"name" : "Bảo hiểm tai nạn con người",
  				"sref": "product.tnc"
  			},
  			{
  				"id": 10,
  				"code": "HHVC",
  				"name" : "Bảo hiểm Hàng hóa vận chuyển nội địa",
  				"sref": "product.hhvc"
  			},
  		];
  		
  		// Function
        
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.user = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            collapseNavbar();
            LoginService.openRegisterForm();
        }

        function login() {
        	Auth.logout();

            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
    }
})();
