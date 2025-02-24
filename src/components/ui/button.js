import {LitElement, html, css} from 'lit';

class AppButton extends LitElement {
  static properties = {
    type: {type: String},
    className: {type: String},
  };

  static styles = css`
    :host {
      display: block;
    }
    .app-button {
      padding: var(--spacing-2) var(--spacing-4);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;

      &.primary {
        background-color: var(--primary-color);
        color: white;
      }

      &.secondary {
        background-color: var(--secondary-color);
        color: white;
      }

      &.light {
        background-color: transparent;
        border: 1px solid var(--secondary-color);
        color: black;
      }
    }
  `;

  constructor() {
    super();
    this.type = 'button';
    this.className = '';
  }

  handleClick(event) {
    if (this.type === 'submit') {
      this.closest('form').dispatchEvent(new Event('submit'));
    }

    this.dispatchEvent(new CustomEvent('button-click', {detail: event}));
  }

  render() {
    return html`
      <button
        type="${this.type}"
        @click="${this.handleClick}"
        class="app-button ${this.className}"
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('app-button', AppButton);
