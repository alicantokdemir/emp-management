import {LitElement, html, css} from 'lit';
import Fontawesome from 'lit-fontawesome';
import {translate as t} from 'lit-translate';
import {formatPhoneNumber, formatDate} from '../../utils/format.js';

class EmployeeTable extends LitElement {
  static properties = {
    employees: {type: Array},
  };

  static styles = [
    Fontawesome,
    css`
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
      }
      tr {
        border-bottom: 1px solid #ddd;
      }
      th,
      td {
        padding: var(--spacing-5) var(--spacing-2);
        text-align: center;
      }
      th {
        color: var(--primary-color);
      }

      .actions {
        i {
          cursor: pointer;
          margin: 0 var(--spacing-1);
          color: var(--primary-color);
        }
      }

      .employee-name {
        font-weight: bold;
      }
    `,
  ];

  constructor() {
    super();
    this.employees = [];
  }

  handleEditEmployee(employee) {
    this.dispatchEvent(new CustomEvent('edit-employee', {detail: employee}));
  }

  handleDeleteEmployee(employee) {
    this.dispatchEvent(new CustomEvent('delete-employee', {detail: employee}));
  }

  render() {
    return html`
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>${t('Employees.First Name')}</th>
            <th>${t('Employees.Last Name')}</th>
            <th>${t('Employees.Date of Employment')}</th>
            <th>${t('Employees.Date of Birth')}</th>
            <th>${t('Employees.Phone')}</th>
            <th>${t('Employees.Email')}</th>
            <th>${t('Employees.Department')}</th>
            <th>${t('Employees.Position')}</th>
            <th>${t('Common.Actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${this.employees.map(
            (employee) => html`
              <tr>
                <td><input type="checkbox" /></td>
                <td class="employee-name">${employee.firstName}</td>
                <td class="employee-name">${employee.lastName}</td>
                <td>${formatDate(employee.dateOfEmployment)}</td>
                <td>${formatDate(employee.dateOfBirth)}</td>
                <td>${formatPhoneNumber(employee.phone)}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td class="actions">
                  <i
                    class="fas fa-edit"
                    @click="${() => this.handleEditEmployee(employee)}"
                  ></i>
                  <i
                    class="fas fa-trash"
                    @click="${() => this.handleDeleteEmployee(employee)}"
                  ></i>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

customElements.define('employee-table', EmployeeTable);
