import {LitElement, html, css} from 'lit';
import {translate as t} from 'lit-translate';

class NotFoundView extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      padding: var(--spacing-5);
    }
    h1 {
      color: red;
    }
  `;

  render() {
    return html`
      <h1>404 - ${t('NotFound.Page Not Found')}</h1>
      <p>${t('NotFound.The page you are looking for does not exist')}</p>
    `;
  }
}

customElements.define('not-found-view', NotFoundView);
