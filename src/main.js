import {Router} from '@vaadin/router';
import './views/home.js';
import './views/employee-add.js';
import './views/employee-list.js';

import {registerTranslateConfig} from 'lit-translate';
import {use} from 'lit-translate';

registerTranslateConfig({
  loader: (lang) =>
    fetch(`src/translations/${lang}.json`).then((res) => res.json()),
});

const defaultLang = 'en';

use(defaultLang);

const outlet = document.querySelector('#app');
const router = new Router(outlet);

router.setRoutes([
  {path: '/', component: 'home-view'},
  {path: '/employees', component: 'employee-list-view'},
  {path: '/employees/add', component: 'employee-edit-view'},
  {path: '/employees/edit/:employeeId', component: 'employee-edit-view'},
  {path: '(.*)', component: 'not-found-view'},
]);
