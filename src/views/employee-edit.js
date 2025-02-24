import {html, LitElement} from 'lit';
import {translate as t} from 'lit-translate';
import '../layouts/app-layout.js';
import '../containers/employee/employee-edit.js';
import EmployeeService from '../services/employeeService.js';

class EmployeeEditView extends LitElement {
  async onBeforeEnter(location) {
    this.employee = await EmployeeService.getEmployeeById(
      location.params.employeeId
    );
  }

  render() {
    return html`
      <app-layout>
        <span slot="title">${t('Employees.Edit Employee')}</span>
        ${!this.employee
          ? html`<p slot="content">${t('Loading...')}</p>`
          : html`<employee-edit
              slot="content"
              .employee=${this.employee}
            ></employee-edit>`}
      </app-layout>
    `;
  }
}

customElements.define('employee-edit-view', EmployeeEditView);
