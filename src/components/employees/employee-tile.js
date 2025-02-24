import {LitElement, html, css} from 'lit';
import Fontawesome from 'lit-fontawesome';
import {translate as t} from 'lit-translate';
import {formatPhoneNumber, formatDate} from '../../utils/format.js';
import '../ui/button.js';

class EmployeeTile extends LitElement {
  static get properties() {
    return {
      employees: {type: Array},
    };
  }

  static get styles() {
    return [
      Fontawesome,

      css`
        .employee-tile {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 16px;
        }

        .employee-card {
          border: 1px solid transparent;
          width: 330px;
          padding: 16px;
          margin: 8px;
          box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-wrap: wrap;
        }

        .employee-card__field {
          display: block;
          width: 50%;

          margin-bottom: 16px;

          label {
            color: var(--secondary-color);
            font-size: 0.8em;
          }

          p {
            margin: 0;
          }
        }

        .employee-card h2 {
          margin: 0;
          font-size: 1.5em;
        }
        .employee-card app-button.edit {
          margin-right: var(--spacing-3);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.employees = [];
  }

  render() {
    return html`
      <div class="employee-tile">
        ${this.employees.map(
          (employee) => html`
            <div class="employee-card">
              <div class="employee-card__field">
                <label for="firstName-${employee.id}"
                  >${t('Employees.First Name')}</label
                >
                <p id="firstName-${employee.id}">${employee.firstName}</p>
              </div>
              <div class="employee-card__field">
                <label for="lastName-${employee.id}"
                  >${t('Employees.Last Name')}</label
                >
                <p id="lastName-${employee.id}">${employee.lastName}</p>
              </div>
              <div class="employee-card__field">
                <label for="dateOfEmployment-${employee.id}"
                  >${t('Employees.Date of Employment')}</label
                >
                <p id="dateOfEmployment-${employee.id}">
                  ${formatDate(employee.dateOfEmployment)}
                </p>
              </div>
              <div class="employee-card__field">
                <label for="dateOfBirth-${employee.id}"
                  >${t('Employees.Date of Birth')}</label
                >
                <p id="dateOfBirth-${employee.id}">
                  ${formatDate(employee.dateOfBirth)}
                </p>
              </div>
              <div class="employee-card__field">
                <label for="phone-${employee.id}"
                  >${t('Employees.Phone')}</label
                >
                <p id="phone-${employee.id}">
                  ${formatPhoneNumber(employee.phone)}
                </p>
              </div>
              <div class="employee-card__field">
                <label for="email-${employee.id}"
                  >${t('Employees.Email')}</label
                >
                <p id="email-${employee.id}">${employee.email}</p>
              </div>
              <div class="employee-card__field">
                <label for="department-${employee.id}"
                  >${t('Employees.Department')}</label
                >
                <p id="department-${employee.id}">${employee.department}</p>
              </div>
              <div class="employee-card__field">
                <label for="position-${employee.id}"
                  >${t('Employees.Position')}</label
                >
                <p id="position-${employee.id}">${employee.position}</p>
              </div>

              <app-button
                class="edit"
                className="secondary"
                @button-click="${() => this.handleEditEmployee(employee)}"
              >
                <i class="fas fa-edit"></i>
                ${t('Common.Edit')}
              </app-button>

              <app-button
                className="primary delete"
                @button-click="${() => this.handleDeleteEmployee(employee)}"
              >
                <i class="fas fa-trash"></i>
                ${t('Common.Delete')}
              </app-button>
            </div>
          `
        )}
      </div>
    `;
  }

  handleEditEmployee(employee) {
    this.dispatchEvent(new CustomEvent('edit-employee', {detail: employee}));
  }

  handleDeleteEmployee(employee) {
    this.dispatchEvent(new CustomEvent('delete-employee', {detail: employee}));
  }
}

customElements.define('employee-tile', EmployeeTile);
