import {Router} from '@vaadin/router';
import './views/home.js';
import './containers/employee/employee-list.js';
import './containers/employee/employee-edit.js';

const outlet = document.querySelector('#app');
const router = new Router(outlet);

router.setRoutes([
  {path: '/', component: 'home-view'},
  {path: '/employees', component: 'employee-list-view'},
  {path: '/employees/add', component: 'employee-edit-view'},
  {path: '/employees/edit/:employeeId', component: 'employee-edit-view'},
  {path: '(.*)', component: 'not-found-view'},
]);
