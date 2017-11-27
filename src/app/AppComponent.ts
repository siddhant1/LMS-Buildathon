import './AppComponent.scss';

export default class AppComponent {
  constructor(rootElement: HTMLElement|null) {
    if (rootElement === null) {
      throw(new Error('no root element found.'));
    }
    console.log('done!');
  }
}