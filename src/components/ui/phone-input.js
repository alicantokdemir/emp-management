import {LitElement, html, css} from 'lit';
import '../../components/ui/button.js';
import '../../components/ui/date-picker.js';
import IMask from 'imask';

class PhoneInput extends LitElement {
  static properties = {
    value: {type: String},
    name: {type: String},
  };

  static styles = css`
    :host {
      display: block;
    }

    input {
      width: -webkit-fill-available;
      padding: var(--spacing-2);
    }
  `;

  firstUpdated() {
    const input = this.shadowRoot.querySelector('#phone');
    this.phoneMask = IMask(input, {
      mask: '+(9\\0) 000 000 00 00',
    });
  }

  handleInputChange = (e) => {
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('phone-changed', {
          detail: '90' + this.phoneMask.unmaskedValue,
        })
      );
    }, 0);
  };

  render() {
    return html`
      <input
        type="text"
        id="phone"
        name=${this.name}
        placeholder="+(90) ___ ___ __ __"
        .value="${this.value}"
        @input="${this.handleInputChange}"
      />
    `;
  }
}

customElements.define('phone-input', PhoneInput);
