import {LitElement, html, css} from 'lit';
import flatpickr from 'flatpickr';
import Fontawesome from 'lit-fontawesome';

class DatePicker extends LitElement {
  static properties = {
    value: {type: String},
    name: {type: String},
  };

  static styles = [
    Fontawesome,
    css`
      :host {
        display: block;
      }

      .date-picker-container {
        display: block;
        position: relative;
        width: 100%;
        /* display: flex;
        align-items: center;
        border: var(--input-border);
        padding: var(--spacing-2);
        /* border-radius: 5px; */
        cursor: pointer;
        background-color: white;
      }

      .date-picker-container input {
        /* border: none;
        outline: none;
        padding-top: 0;
        padding-bottom: 0;
        width: 135px; */
        width: -webkit-fill-available;
        padding: var(--spacing-2);
      }

      .date-picker-container i {
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-60%);
        margin-left: var(--spacing-2);
        color: var(--primary-color);
        cursor: pointer;
      }
    `,
  ];

  firstUpdated() {
    const input = this.shadowRoot.querySelector('#datepicker-input');

    const parseDate = (str) => {
      if (!str) {
        return new Date();
      }

      const date = str.split('-');
      return new Date(date[0], date[1] - 1, date[2]);
    };

    const unparseDate = (str) => {
      if (!str) return '';

      const dateSplit = str.split('/');

      const date = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;

      return date;
    };

    flatpickr(input, {
      dateFormat: 'd/m/Y',
      allowInput: true,
      defaultDate: parseDate(this.value),
      parseDate,
      onClose: (selectedDates, dateStr, instance) => {
        this.dispatchEvent(
          new CustomEvent('date-changed', {
            detail: unparseDate(dateStr),
          })
        );
      },
    });
  }

  render() {
    return html`
      <div class="date-picker-container">
        <input
          .value=${this.value || ''}
          id="datepicker-input"
          name="${this.name}"
          type="text"
          placeholder="Select date"
        />
        <i
          @click="${() =>
            this.shadowRoot.getElementById('datepicker-input').click()}"
          class="fas fa-calendar-alt"
        ></i>
      </div>
    `;
  }
}

customElements.define('date-picker', DatePicker);
