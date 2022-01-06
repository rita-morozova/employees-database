import axios from 'axios';
import authHeader from './AuthHeader';

const baseUrl = 'http://localhost:8083/employee/employee';

class EmployeesService {

    getEmployeesList() {
        return axios.get(`${baseUrl}/employees`, {headers: authHeader()});
    }

    addEmployee(employee) {
        return axios.post(`${baseUrl}/employees`, employee, {headers: authHeader()});
    };

    getEmployee(id) {
        return axios.get(`${baseUrl}/employee/${id}`, {headers: authHeader()});
    }

    editEmployee(id, employee) {
        return axios.put(`${baseUrl}/employee/${id}`, employee, {headers: authHeader()});
    }

    deleteEmployee(id) {
        return axios.delete(`${baseUrl}/employee/${id}`, {headers: authHeader()});
    }
}

export default new EmployeesService();
