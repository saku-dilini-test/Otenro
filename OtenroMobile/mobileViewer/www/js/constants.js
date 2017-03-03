
angular.module('starter')

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    admin: 'admin_role',
    public: 'public_role'
  })

  // local development
    .constant('SERVER_URL', 'http://dashboard.otenro.com/');
  // Stage testing
  // .constant('SERVER_URL', 'http://192.168.8.203:1340/');
