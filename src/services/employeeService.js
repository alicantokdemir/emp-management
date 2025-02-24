import EMPLOYEES from '../mocks/employees';

class EmployeeService {
  _apiUrl = '/mocks/employees.json';

  async getEmployees({page = 1, itemsPerPage = 10}) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      data: EMPLOYEES.slice(start, end),
      totalCount: EMPLOYEES.length,
      page,
    };
  }

  async getEmployeeById(id) {
    return EMPLOYEES.find((employee) => employee.id === +id);
  }

  async addEmployee(employee) {
    EMPLOYEES.push(employee);
    return;
  }

  async updateEmployee(employee) {
    const emp = await this.getEmployeeById(employee.id);
    if (!emp) {
      return null;
    }

    Object.assign(emp, employee);

    return emp;
  }

  async deleteEmployee(id) {
    const index = EMPLOYEES.findIndex((employee) => employee.id === id);
    if (index === -1) {
      return null;
    }

    EMPLOYEES.splice(index, 1);
    return;
  }
}

export default new EmployeeService();
