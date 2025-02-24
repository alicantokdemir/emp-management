import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import {translate as t, get as getTranslation} from 'lit-translate';
import '../../components/ui/button.js';
import '../../components/ui/phone-input.js';
import '../../components/ui/date-picker.js';
import EmployeeService from '../../services/employeeService.js';

class EmployeeEdit extends LitElement {
  static properties = {
    employee: {type: Object},
  };

  static styles = css`
    :host {
      display: block;
    }

    .employee-edit {
      padding: var(--spacing-3) var(--spacing-3);
      background-color: white;
    }

    .employee-edit__description {
      font-size: 0.8em;
      font-weight: bold;
    }

    .employee-form {
      display: flex;
      flex-wrap: wrap;
      padding: var(--spacing-5) var(--spacing-6);
      gap: 64px;
    }

    .form-group {
      flex: 0 0 calc(33.333% - 64px);

      label,
      input,
      select,
      date-picker,
      phone-input {
        max-width: 200px;
        min-width: 175px;
      }
    }

    label {
      display: block;
      margin-bottom: var(--spacing-1);
      font-size: 0.8em;
    }

    input,
    select {
      width: 100%;
      padding: var(--spacing-2);
      box-sizing: border-box;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: var(--spacing-4);
    }

    app-button {
      width: 175px;
    }

    app-button[type='submit'] {
      margin-right: var(--spacing-6);
    }
  `;

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: 'Analytics',
      position: 'Junior',
    };

    this.departments = ['Analytics', 'Tech'];
    this.positions = ['Junior', 'Medior', 'Senior'];
  }

  handleCancel(e) {
    Router.go('/employees');
  }

  handleInputChange(e) {
    const {name} = e.target;

    const value = typeof e.detail === 'string' ? e.detail : e.target.value;

    this.formData = {...this.formData, [name]: value};
  }

  async handleSubmit(e) {
    if (!e.target.reportValidity()) {
      return;
    }

    e.preventDefault();

    const updatedEmployee = Object.assign({}, this.employee, this.formData);

    const phoneInput = this.shadowRoot.querySelector('phone-input');
    if (!updatedEmployee.phone || updatedEmployee.phone.length < 10) {
      phoneInput.shadowRoot
        .querySelector('input')
        .setCustomValidity(getTranslation('Validation.InvalidNumber'));
      phoneInput.shadowRoot.querySelector('input').reportValidity();
      return;
    }

    const dateOfBirthInput = this.shadowRoot.querySelector(
      'date-picker[name="dateOfBirth"]'
    );
    if (!updatedEmployee.dateOfBirth) {
      dateOfBirthInput.shadowRoot
        .querySelector('input')
        .setCustomValidity(getTranslation('Validation.InvalidDate'));
      dateOfBirthInput.shadowRoot.querySelector('input').reportValidity();
      return;
    }

    const dateOfEmploymentInput = this.shadowRoot.querySelector(
      'date-picker[name="dateOfEmployment"]'
    );
    if (!updatedEmployee.dateOfEmployment) {
      dateOfEmploymentInput.shadowRoot
        .querySelector('input')
        .setCustomValidity(getTranslation('Validation.InvalidDate'));
      dateOfEmploymentInput.shadowRoot.querySelector('input').reportValidity();
      return;
    }

    if (updatedEmployee.id) {
      const title = t('Common.Are you sure?');
      const content = t('Employees.RecordWillBeUpdated', {
        name: this.employee.firstName + ' ' + this.employee.lastName,
      });

      const cb = () =>
        EmployeeService.updateEmployee(updatedEmployee).then(() => {
          Router.go('/employees');
        });

      openGlobalPopup(title, content, cb);
    } else {
      await EmployeeService.addEmployee(updatedEmployee);
      Router.go('/employees');
    }
  }

  render() {
    return html`
      <div class="employee-edit">
        ${this.employee.id
          ? html` <div class="employee-edit__description">
              ${t('Employees.YouAreEditing', {
                name: this.employee.firstName + ' ' + this.employee.lastName,
              })}
            </div>`
          : ''}

        <form class="employee-form" @submit="${this.handleSubmit}">
          <div class="form-group">
            <label for="firstName">${t('Employees.First Name')}</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              .value="${this.employee.firstName}"
              @input="${this.handleInputChange}"
              required
            />
          </div>
          <div class="form-group">
            <label for="lastName">${t('Employees.Last Name')}</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              .value="${this.employee.lastName}"
              @input="${this.handleInputChange}"
              required
            />
          </div>
          <div class="form-group">
            <label for="dateOfEmployment"
              >${t('Employees.Date of Employment')}</label
            >

            <date-picker
              name="dateOfEmployment"
              @date-changed="${this.handleInputChange}"
              .value="${this.employee.dateOfEmployment}"
              required
            >
            </date-picker>
          </div>
          <div class="form-group">
            <label for="dateOfBirth">${t('Employees.Date of Birth')}</label>
            <date-picker
              name="dateOfBirth"
              @date-changed="${this.handleInputChange}"
              .value="${this.employee.dateOfBirth}"
              required
            >
            </date-picker>
          </div>
          <div class="form-group">
            <label for="phone">${t('Employees.Phone')}</label>
            <phone-input
              name="phone"
              @phone-changed="${this.handleInputChange}"
              .value="${this.employee.phone}"
              required
            ></phone-input>
          </div>
          <div class="form-group">
            <label for="email">${t('Employees.Email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              .value="${this.employee.email}"
              @input="${this.handleInputChange}"
            />
          </div>
          <div class="form-group">
            <label for="department">${t('Employees.Department')}</label>
            <select
              id="department"
              name="department"
              .value="${this.employee.department}"
              @change="${this.handleInputChange}"
            >
              ${this.departments.map(
                (department) =>
                  html`<option value="${department}">${department}</option>`
              )}
            </select>
          </div>
          <div class="form-group">
            <label for="position">${t('Employees.Position')}</label>
            <select
              id="position"
              name="position"
              .value="${this.employee.position}"
              @change="${this.handleInputChange}"
            >
              ${this.positions.map(
                (position) =>
                  html`<option value="${position}">${position}</option>`
              )}
            </select>
          </div>

          <div class="form-actions">
            <app-button className="primary" type="submit"
              >${t('Common.Save')}</app-button
            >
            <app-button
              className="light"
              type="button"
              @button-click="${this.handleCancel}"
            >
              ${t('Common.Cancel')}
            </app-button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define('employee-edit', EmployeeEdit);
