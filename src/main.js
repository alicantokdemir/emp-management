import {Router} from '@vaadin/router';
import './views/home.js';
import './views/employee-add.js';
import './views/employee-edit.js';
import './views/employee-list.js';
import './views/not-found.js';
import './store/app.js';

import {
  registerTranslateConfig,
  use,
  get as getTranslation,
} from 'lit-translate';

registerTranslateConfig({
  loader: (lang) =>
    fetch(`/src/translations/${lang}.json`).then((res) => res.json()),
});

const availableLangs = ['en', 'tr'];
const defaultLang = getDefaultLang();

const outlet = document.querySelector('#app');
const router = new Router(outlet);

router.setRoutes([
  {
    path: '/:lang',
    action: (context, commands) => {
      const currentLang = document.documentElement.lang;
      const newLang = context.params.lang;

      if (currentLang !== newLang) {
        setLang(newLang);

        return commands.redirect(
          `/${document.documentElement.lang}${
            context.pathname.replace(/^\/(en|tr)/, '') || ''
          }`
        );
      }

      return undefined;
    },
    children: [
      {path: '/', component: 'home-view'},
      {path: '/employees', component: 'employee-list-view'},
      {path: '/employees/add', component: 'employee-add-view'},
      {path: '/employees/edit/:employeeId', component: 'employee-edit-view'},
      {path: '(.*)', component: 'not-found-view'},
    ],
  },
  {
    path: '/',
    action: (context, commands) => {
      return commands.redirect(`/${defaultLang}/`);
    },
  },
]);

function setLang(lang) {
  if (!availableLangs.includes(lang)) {
    lang = document.documentElement.lang || getDefaultLang();
  }

  document.documentElement.lang = lang;

  use(lang).then(() => {
    document.title = getTranslation('App.Title');
    document.querySelector('meta[name="description"]').content =
      getTranslation('App.Description');
    document.querySelector('meta[name="keywords"]').content =
      getTranslation('App.Keywords');
  });
}

function getDefaultLang() {
  const lang = navigator.language?.split('-')[0] || 'en';

  return availableLangs.includes(lang) ? lang : 'en';
}
