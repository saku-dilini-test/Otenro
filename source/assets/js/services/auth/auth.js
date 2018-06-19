angular.module('app')
  .factory('Auth', function($http, LocalService, AccessLevels ,$auth) {
    return {
      authorize: function(access) {
        if (access === AccessLevels.user) {
          return this.isAuthenticated();
        } else {
          return true;
        }
      },
      isAuthenticated: function() {
        return $auth.isAuthenticated();
      },
      login: function(credentials) {
        var login = $http.post('/auth/authenticate', credentials);
        login.success(function(result) {
          LocalService.set('satellizer_token', result.token );
          LocalService.set('user', result.user);
        });
        return login;
      },
      mobileLogin: function (credentials) {
        var login = $http.post('/auth/verifyMobilePin', credentials);
          login.success(function(result) {
              LocalService.set('satellizer_token', result.token );
              LocalService.set('user', result.user);
          });
          return login;
      },
      sendAgentInfo: function(agentInfo) {
      var agent = $http.post('/auth/sendAgentInfo', agentInfo);
      agent.success(function(result) {
            console.log(result);
          });
      },
      getAgentInfo: function(agentName) {
        return $http.get('/edit/getAdNetwork?addname='+agentName);
      },
      updateUserAdInfo: function(agentInfo) {
        var agent = $http.post('/auth/updateUserAdNetwork', agentInfo);
        agent.success(function(result) {
        });
      },

      logout: function() {
        LocalService.unset('user');
        LocalService.unset('satellizer_token');
      },
      register: function(formData) {
        LocalService.unset('satellizer_token');
        var register = $http.post('/auth/register', formData);
        register.success(function(result) {
          // LocalService.set('satellizer_token', result.token );
          // LocalService.set('user', result.user);
        });
        return register;
      },
      verifyMobile: function (user) {
          var verifyMobile = $http.post('/auth/verifyMobileNumber', user);
          verifyMobile.success(function (result) {
              LocalService.set('satellizer_token', result.token );
              LocalService.set('user', result.user);
          });
          return verifyMobile;
      },
      //Authentication for password forgot users
      forgotPassword: function(formData) {
        LocalService.unset('satellizer_token');
        var forgotPassword = $http.post('/auth/forgotPassword', formData);
        forgotPassword.success(function(result) {
          LocalService.set('satellizer_token', result.token );
          LocalService.set('user', result.user);
        });
        return forgotPassword;
      }
    }
  })
  .factory('AuthInterceptor', function($q, $injector) {
    var LocalService = $injector.get('LocalService');

    return {
      request: function(config) {
        var token;
        if (LocalService.get('satellizer_token')) {
          token = LocalService.get('satellizer_token');
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          LocalService.unset('satellizer_token');
          $injector.get('$state').go('anon.login');
        }
        return $q.reject(response);
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

  });