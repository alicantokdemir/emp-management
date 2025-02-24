import {LitElement, html, css} from 'lit';
import {translate as t} from 'lit-translate';
import {Router} from '@vaadin/router';
import EmployeeService from '../../services/employeeService';
import store from '../../store/app';
import Fontawesome from 'lit-fontawesome';
import '../../components/employees/employee-table';
import '../../components/employees/employee-tile';
import {setQueryParam} from '../../utils/url';

class EmployeeList extends LitElement {
  static properties = {
    employees: {type: Array},
    currentPage: {type: Number},
    itemsPerPage: {type: Number},
    employeesCount: {type: Number},
    view: {type: String},
  };

  static styles = [
    Fontawesome,
    css`
      :host {
        display: block;
      }

      .employee-list {
        overflow-x: auto;
      }

      .pagination {
        display: flex;
        justify-content: center;
        margin-top: var(--spacing-4);
        overflow: auto;

        i {
          color: var(--primary-color);
        }

        button.prev:disabled i,
        button.next:disabled i {
          color: #ddd;
        }
      }
      .pagination button {
        width: 30px;
        height: 30px;
        margin: 0 var(--spacing-1);
        border: none;
        background-color: transparent;
        border-radius: 100%;
        cursor: pointer;
      }

      .pagination .page-btn:disabled {
        background-color: var(--primary-color);
        color: white;
      }
    `,
  ];

  constructor() {
    super();
    this.employees = [];
    this.employeesCount = 0;
    this.currentPage = 1;
    this.itemsPerPage = 9;
  }

  appState = store.getInitialState();

  async loadEmployees() {
    const res = await EmployeeService.getEmployees({
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    });

    this.appState.loadEmployees(res.data);
    this.employeesCount = res.totalCount;
    this.employees = res.data;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.loadEmployees();
  }

  handlePageChange(page) {
    this.currentPage = page;
    this.loadEmployees();
    setQueryParam('page', page);
  }

  renderPagination() {
    const totalPages = Math.ceil(this.employeesCount / this.itemsPerPage);
    const currentPage = this.currentPage;
    const pagesToShow = 5;

    const createPageButton = (page) => html`
      <button
        @click="${() => this.handlePageChange(page)}"
        ?disabled="${this.currentPage === page}"
        class="page-btn"
      >
        ${page}
      </button>
    `;

    const createEllipsisButton = (startPage) =>
      html`
        <button @click="${() => this.handlePageChange(startPage)}">...</button>
      `;

    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    return html`
      <div class="pagination">
        <button
          @click="${() => this.handlePageChange(currentPage - 1)}"
          ?disabled="${currentPage === 1}"
          class="prev"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        ${startPage > 1 ? createPageButton(1) : ''}
        ${startPage > 2 ? createEllipsisButton(startPage - pagesToShow) : ''}
        ${Array.from(
          {length: endPage - startPage + 1},
          (_, i) => startPage + i
        ).map((page) => createPageButton(page))}
        ${endPage < totalPages - 1
          ? createEllipsisButton(endPage + pagesToShow)
          : ''}
        ${endPage < totalPages ? createPageButton(totalPages) : ''}
        <button
          @click="${() => this.handlePageChange(currentPage + 1)}"
          ?disabled="${currentPage === totalPages}"
          class="next"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;
  }

  handleDeleteEmployee(e) {
    const employee = e.detail;

    const title = t('Common.Are you sure?');
    const content = t('Employees.RecordWillBeDeleted', {
      name: employee.firstName + ' ' + employee.lastName,
    });

    const cb = () =>
      EmployeeService.deleteEmployee(employee.id).then(() => {
        this.loadEmployees();
      });

    openGlobalPopup(title, content, cb);
  }

  handleEditEmployee(e) {
    const employee = e.detail;

    const language = document.documentElement.lang;

    Router.go(`/${language}/employees/edit/${employee.id}`);
  }

  render() {
    return html`
      <div class="employee-list">
        ${this.view === 'list'
          ? html`<employee-table
              .employees="${this.employees}"
              @delete-employee="${this.handleDeleteEmployee}"
              @edit-employee="${this.handleEditEmployee}"
            ></employee-table>`
          : html`<employee-tile
              .employees="${this.employees}"
              @delete-employee="${this.handleDeleteEmployee}"
              @edit-employee="${this.handleEditEmployee}"
            ></employee-tile>`}
      </div>
      ${this.renderPagination()}
    `;
  }
}

customElements.define('employee-list', EmployeeList);
