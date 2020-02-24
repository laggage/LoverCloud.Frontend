// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
