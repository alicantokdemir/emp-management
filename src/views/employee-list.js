import {css, html, LitElement} from 'lit';
import {translate as t} from 'lit-translate';
import '../layouts/app-layout.js';
import '../containers/employee/employee-list.js';
import Fontawesome from 'lit-fontawesome';

class EmployeeListView extends LitElement {
  static properties = {
    currentView: {type: String},
  };

  static styles = [
    Fontawesome,
    css`
      .employee-list__view-switcher {
        display: flex;
        justify-content: flex-end;
      }
      .employee-list__view-switcher a {
        margin: 0 var(--spacing-1);
        color: #ddd;
        cursor: pointer;
        font-size: 20px;
      }
      .employee-list__view-switcher a.active {
        color: var(--primary-color);
      }
    `,
  ];

  constructor() {
    super();
    this.currentView = 'list';
  }

  connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    this.currentView = urlParams.get('view') || 'list';
    this.currentPage = urlParams.get('page') || '1';
  }

  render() {
    return html`
      <app-layout>
        <span slot="title">${t('Employees.Employee List')}</span>
        <div class="employee-list__view-switcher" slot="actions">
          <a
            class="${this.currentView === 'list' ? 'active' : ''}"
            href="/employees?view=list"
          >
            <i class="fas fa-bars"></i>
          </a>
          <a
            class="${this.currentView === 'tile' ? 'active' : ''}"
            href="/employees?view=tile"
          >
            <i class="fas fa-th"></i>
          </a>
        </div>
        <employee-list
          .view="${this.currentView}"
          .currentPage="${parseInt(this.currentPage)}"
          slot="content"
        ></employee-list>
      </app-layout>
    `;
  }
}

customElements.define('employee-list-view', EmployeeListView);
