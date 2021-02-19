import axios from 'axios';

//const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee";

class EmployeeService {

    getEmployees() {
        return axios.get(`http://localhost:7004/employee/findAll`);
        }

        createEmployee(employee) {
            return axios.post(`http://localhost:7004/addEmployee`, employee);
        }

        getEmployeeById(eid) {
            console.log("url" + `http://localhost:7004/employee/find/` + eid);
            return axios.get(`http://localhost:7004/employee/find/` + eid);
        }

        updateEmployee(employee) {
            return axios.put(`http://localhost:7004/updateEmployee`, employee);
        }

        deleteEmployee(eid) {
            return axios.delete(`http://localhost:7004/employee/delete/` + eid);
        }

        viewEmployee(eid){
            return axios.get(`http://localhost:7004/employee/find/`+eid);
        }
    }

    export default new EmployeeService()