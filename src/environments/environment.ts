import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../app/app.module';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  fire: {
    apiKey: 'AIzaSyD2uuctul45SbAVR3aVVQws3xce2A8jWUw',
    authDomain: 'ramostecnodev.firebaseapp.com',
    databaseURL: 'https://ramostecnodev.firebaseio.com',
    projectId: 'ramostecnodev',
    storageBucket: 'ramostecnodev.appspot.com',
    messagingSenderId: '679575782296'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
});

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
