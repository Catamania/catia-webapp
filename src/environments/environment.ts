// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  usersServiceUrl: 'https://allstack.fr/slack-commands-server',
  slackBotUrl: 'http://78.212.193.11:3002/api/v1',
  ethBotUrl: 'http://78.212.193.11:8182',
  krakenPrivateKey: '<MY_PRIVATE_KEY>',
  krakenSecret: '<MY_SECRET>'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
