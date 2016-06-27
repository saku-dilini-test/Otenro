/**
 * Created by amila on 1/28/16.
 */


angular.module('starter')

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    admin: 'admin_role',
    public: 'public_role'
  })

  .constant('SERVER_URL', 'http://192.168.8.157:1337/');
