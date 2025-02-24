import {html, fixture, expect, oneEvent} from '@open-wc/testing';
import './employee-table.js';

describe('EmployeeTable', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-table></employee-table>`);
    element.employees = [
      {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer',
      },
    ];
    await element.updateComplete;
  });

  it('renders a table', () => {
    const table = element.shadowRoot.querySelector('table');
    expect(table).to.exist;
  });

  it('renders the correct number of rows', () => {
    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(1);
  });

  it('renders employee data correctly', () => {
    const firstNameCell = element.shadowRoot.querySelector(
      'tbody tr td.employee-name'
    );
    expect(firstNameCell.textContent).to.equal('John');
  });

  it('dispatches edit-employee event on edit icon click', async () => {
    const editIcon = element.shadowRoot.querySelector('.fa-edit');
    setTimeout(() => editIcon.click());
    const {detail} = await oneEvent(element, 'edit-employee');
    expect(detail.firstName).to.equal('John');
  });

  it('dispatches delete-employee event on delete icon click', async () => {
    const deleteIcon = element.shadowRoot.querySelector('.fa-trash');
    setTimeout(() => deleteIcon.click());
    const {detail} = await oneEvent(element, 'delete-employee');
    expect(detail.firstName).to.equal('John');
  });
});
