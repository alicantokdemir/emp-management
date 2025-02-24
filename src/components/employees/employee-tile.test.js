import {html, fixture, expect, oneEvent} from '@open-wc/testing';
import './employee-tile.js';

describe('EmployeeTile', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-tile></employee-tile>`);
  });

  it('renders an empty employee tile', () => {
    expect(element.shadowRoot.querySelector('.employee-tile')).to.exist;
  });

  it('renders employee cards when employees are provided', async () => {
    element.employees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2021-01-01',
        dateOfBirth: '1990-01-01',
        phone: '1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer',
      },
    ];
    await element.updateComplete;
    const employeeCards = element.shadowRoot.querySelectorAll('.employee-card');
    expect(employeeCards.length).to.equal(1);
  });

  it('dispatches edit-employee event when edit button is clicked', async () => {
    const employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phone: '1234567890',
      email: 'john.doe@example.com',
      department: 'Engineering',
      position: 'Developer',
    };
    element.employees = [employee];
    await element.updateComplete;

    const editButton = element.shadowRoot.querySelector('.edit');
    setTimeout(() => editButton.dispatchEvent(new Event('button-click')));

    const event = await oneEvent(element, 'edit-employee');
    expect(event.detail).to.deep.equal(employee);
  });

  it('dispatches delete-employee event when delete button is clicked', async () => {
    const employee = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phone: '1234567890',
      email: 'john.doe@example.com',
      department: 'Engineering',
      position: 'Developer',
    };
    element.employees = [employee];
    await element.updateComplete;

    const deleteButton = element.shadowRoot.querySelectorAll('app-button')[1];

    setTimeout(() => deleteButton.dispatchEvent(new Event('button-click')));
    const event = await oneEvent(element, 'delete-employee');
    expect(event.detail).to.deep.equal(employee);
  });
});
