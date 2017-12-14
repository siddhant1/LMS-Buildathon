import AppComponent from './app/AppComponent';

const $app = document.getElementById('app');
if ($app) {
  // tslint:disable-next-line:no-unused-expression
  new AppComponent($app);
} else {
  console.error('no element #app found, the app cannot be initialized');
}
