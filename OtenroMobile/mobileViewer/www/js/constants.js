
angular.module('starter')

  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    admin: 'admin_role',
    public: 'public_role'
  })

  .constant('LOGIN_TYPES', {
    EMAIL: 'email',
    MOBILE: 'mobile'
  })

  // local development
    // .constant('SERVER_URL', 'http://192.168.8.98:1337/');
  // Stage testing
  // .constant('SERVER_URL', 'https://developer.appmaker.lk/');
  .constant('SERVER_URL', 'https://ideadroid.ideamart.io/');
