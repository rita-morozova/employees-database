import React, {useState, useEffect} from 'react';
import EmployeesService from '../../services/EmployeesService';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBCardHeader
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom';
import AuthService from '../../services/AuthService';
import {useHistory} from 'react-router-dom';


const EmployeesList = () => {

    const [employees, setEmployees] = useState([]);
    const [currentUser, setCurrentUser] = useState({accessToken: ""})
    const history = useHistory()

    useEffect(() => {
        const user = AuthService.getCurrentUser()

        if (! user) {
            history.push('/')
        } else {
            listAllEmpoloyees()
            setCurrentUser(user)
        }
    }, [])

    const listAllEmpoloyees = () => {
        return EmployeesService.getEmployeesList().then(data => {
            console.log(data)
            let sortedEmployees = data.data.sort((a, b) => {
                a = (a.firstName + a.lastName).toLowerCase()
                b = (b.firstName + b.lastName).toLowerCase()
                return a < b ? -1 : a > b ? 1 : 0
            })
            setEmployees(sortedEmployees)
        })
    }

    return (
        <div className='card'>
            <MDBCardHeader className='text-center text-uppercase py-4 mb-3'>
                <h4>Employees</h4>
            </MDBCardHeader>
            <div className='row justify-content-center col-md-12 mx-auto'>
                <div className='center-table card-body'>
                    <section className='table-add float-right mb-3 mr-2'>
                        <Link to={`/employees/add`}>
                            <MDBBtn>Add Employee</MDBBtn>
                        </Link>
                    </section>
                    <MDBTable striped hover borderless>
                        <MDBTableHead className='stylish-color white-text'>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email Address</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody> {
                            employees.map((e, index) => (
                                <tr key={index}>
                                    <Link to={
                                        `/employee/${
                                            e.userId
                                        }`
                                    }>
                                        <td scope='row'>{e.firstName} {e.lastName}</td>
                                    </Link>
                                    <td>{
                                        e.email
                                    }</td>
                                </tr>
                            ))
                        } </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        </div>
    )
}

export default EmployeesList
