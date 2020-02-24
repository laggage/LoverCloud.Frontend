export const environment = {
  production: true,
  apiHostUrl: 'http://192.168.0.124:3089/',
  imageEndpoint: 'api/lovers/photos',
  anniversaryEndPoint: 'api/lovers/anniversaries',
  albumEndpoint: 'api/lovers/albums',
  registerEndPoint: 'api/users',
  loverLogsEndPoint: 'api/lovers/logs',
  userEndPoint: 'api/users',
  loverRequestEndPoint: 'api/lovers/loverrequests',
  authentication: {
    hostUrl: 'http://192.168.0.124:3088/',
    tokenEndPoint: 'connect/token',
    minUsernameLength: 2,
    maxUsernameLength: 30,
    minPasswordLength: 4,
    maxPasswordLength: 50,
  },
  localStorageTokenKey: 'LC.Cache',
  paginationHeaderKey: 'x-pagination'
};
