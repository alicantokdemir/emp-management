import {LitElement, html, css} from 'lit';
import {translate as t} from 'lit-translate';

class HomeView extends LitElement {
  static styles = css``;

  render() {
    return html`
      <app-layout>
        <span slot="title">${t('Home.Welcome')}</span>
        <p slot="content">${t('Home.Intro')}</p>
      </app-layout>
    `;
  }
}

customElements.define('home-view', HomeView);
