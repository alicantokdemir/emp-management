import {LitElement, html, css} from 'lit';
import Fontawesome from 'lit-fontawesome';
import {translate as t} from 'lit-translate';
import './button.js';

class PopupComponent extends LitElement {
  static styles = [
    Fontawesome,
    css`
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .popup {
        background: white;
        padding: var(--spacing-3);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        min-width: 300px;
        position: relative;

        h3 {
          color: var(--primary-color);
          margin-top: 0;
        }
      }

      .close-btn {
        /* position: absolute;
        top: 5px;
        right: 5px; */
        float: right;
        background: transparent;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--primary-color);
      }

      app-button.proceed-btn {
        margin-bottom: var(--spacing-1);
      }

      .show {
        visibility: visible;
        opacity: 1;
      }
    `,
  ];

  static properties = {
    open: {type: Boolean, reflect: true},
    title: {type: String},
    content: {type: String},
    onProceed: {type: Function},
  };

  constructor() {
    super();
    this.open = false;
  }

  async handleProceed() {
    await this.onProceed();
    this.closePopup();
  }

  closePopup() {
    this.open = false;
  }

  render() {
    return html`
      <div
        class="overlay ${this.open ? 'show' : ''}"
        @click="${this.closePopup}"
      >
        <div class="popup" @click="${(e) => e.stopPropagation()}">
          <i @click="${this.closePopup}" class="fas fa-times close-btn"></i>
          <h3>${this.title}</h3>
          <p>${this.content}</p>
          <app-button
            className="primary"
            class="proceed-btn"
            @button-click="${this.handleProceed}"
          >
            ${t('Common.Proceed')}
          </app-button>
          <app-button
            className="light"
            class="cancel-btn"
            @button-click="${this.closePopup}"
          >
            ${t('Common.Cancel')}
          </app-button>
        </div>
      </div>
    `;
  }
}

customElements.define('app-popup', PopupComponent);
