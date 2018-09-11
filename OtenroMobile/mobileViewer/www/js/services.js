angular.module('starter.services', [])

  .service('AuthService', function($q, $http, USER_ROLES,SERVER_URL) {
    var LOCAL_TOKEN_KEY = 'userToken';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;
    var userRole = '';
    var SEVER_TOKEN_KEY = 'serverTokenKey';

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      var serverToken = window.localStorage.getItem(SEVER_TOKEN_KEY);

      if (token) {
        useCredentials(token,serverToken);
      }
    }

    function storeUserCredentials(token,serverToken) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      window.localStorage.setItem(SEVER_TOKEN_KEY,serverToken);
      useCredentials(token,serverToken);
    }

    function useCredentials(token,serverToken) {
     //alert(JSON.parse(window.localStorage.getItem(LOCAL_TOKEN_KEY)).email);
      userRole = token.role;
      //username = token.split('.')[0];
      isAuthenticated = true;
      authToken = token;

      if (userRole == 'admin') {
        role = USER_ROLES.admin
      }
      if (userRole == 'user') {
        role = USER_ROLES.public
      }

      // Set the token as header for your requests!
      //$http.defaults.headers.common['X-Auth-Token'] = token;
      $http.defaults.headers.common['Authorization'] = "ServerToken= "+serverToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['Authorization'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      window.localStorage.removeItem(SEVER_TOKEN_KEY);

    }

    var login = function(credentials) {
      // var userData = {
      //   email: name,
      //   password: pw,
      //   method: 'email'
      // };

      return $q(function(resolve, reject) {
        // Make a request and receive your auth token from your server
          $http.post(SERVER_URL+'auth/authenticate',credentials).success(function (data) {
            if (data.user) {
              storeUserCredentials(JSON.stringify(data.user),data.token);
            }
            resolve('Admin Login success.');
          }).error(function (err) {
            console.log('Error data => ' + err)
            reject('Login Failed.');
          });
      });
    };

    var  mobileLogin = function (credentials) {

      return $q(function(resolve, reject) {
          $http.post(SERVER_URL + 'auth/verifyMobilePin',credentials)
          .success(function (data) {
            storeUserCredentials(JSON.stringify(data.user),data.token);
            resolve(data);
          }).error(function (err) {
            reject(err);
          });
      });
    };

    var logout = function() {
      destroyUserCredentials();
    };

    var isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserCredentials();

    return {
      login: login,
      mobileLogin: mobileLogin,
      logout: logout,
      isAuthorized: isAuthorized,
      isAuthenticated: function() {return isAuthenticated;},
      username: function() {return username;},
      role: function() {return role;},
      serverToken : function() {return getServerToken;}
    };
  })

  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });

