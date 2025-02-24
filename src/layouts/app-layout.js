import {LitElement, html, css} from 'lit';
import '../components/navbar/navbar.js';
import '../components/ui/popup.js';

class AppLayout extends LitElement {
  static styles = css`
    body {
      min-height: 100vh;
    }

    :host {
      display: block;
      background-color: #f8f8f8;
    }
    .content {
      padding: 1rem;
      overflow: hidden;
    }

    .content__header {
      display: flex;
      justify-content: space-between;
    }

    h3 {
      color: var(--primary-color);
      margin-top: 0;
      margin-bottom: 1.5rem;
      margin-left: var(--spacing-3);
      width: 50%;
    }

    .actions {
      width: 50%;
      text-align: right;
      color: var(--primary-color);
    }
  `;

  render() {
    return html`
      <app-navbar></app-navbar>

      <div class="content">
        <div class="content__header">
          <h3>
            <slot name="title"></slot>
          </h3>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>

        <slot name="content"></slot>
      </div>

      <app-popup></app-popup>
    `;
  }
}

customElements.define('app-layout', AppLayout);
