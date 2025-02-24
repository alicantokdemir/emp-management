import {html, LitElement} from 'lit';
import {translate as t} from 'lit-translate';
import '../layouts/app-layout.js';
import '../containers/employee/employee-edit.js';

class EmployeeAddView extends LitElement {
  render() {
    return html`
      <app-layout>
        <span slot="title">${t('Employees.Add Employee')}</span>
        <employee-edit slot="content"></employee-edit>
      </app-layout>
    `;
  }
}

customElements.define('employee-add-view', EmployeeAddView);
