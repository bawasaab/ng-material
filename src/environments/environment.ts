// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: "AIzaSyBNWcY8dOXQ7Nm4hsfEO07YTPnfP6LbqBU",
  authDomain: "ng-fitness-tracker-3d099.firebaseapp.com",
  projectId: "ng-fitness-tracker-3d099",
  storageBucket: "ng-fitness-tracker-3d099.appspot.com",
  messagingSenderId: "150905689374",
  appId: "1:150905689374:web:51ef17ef5c738a280e250f",
  measurementId: "G-9CVKWVJ256"
};

export const environment = {
  production: false,
  firebase: firebaseConfig

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
