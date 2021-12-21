import React, {useState, useEffect, useRef} from 'react';
import {MDBBtn, MDBInput, MDBCardHeader} from 'mdb-react-ui-kit';
import EmployeesService from '../../services/EmployeesService';
import {useParams, useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import AuthService from '../../services/AuthService';


const AddEditForm = () => {

    const [employee, setEmployee] = useState({
        id: '',
        firstName: '',
        lastName: '',
        address: '',
        state: '',
        zip: '',
        cellPhone: '',
        email: ''
    })

    const {id} = useParams()
    const history = useHistory()
    const simpleValidator = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState()

    const states = [
        'AL',
        'AK',
        'AS',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'DC',
        'FL',
        'GA',
        'GU',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MH',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'PR',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VI',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY',
    ];


    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (! user) 
            history.push('/')

        

        checkStatus()
    }, [id])

    const checkStatus = () => {
        if (id !== undefined || id !== null) {
            EmployeesService.getEmployee(id).then(res => {
                const data = res.data
                setEmployee({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    state: data.state,
                    zip: data.zip,
                    cellPhone: data.cellPhone,
                    email: data.email
                })

            })
        } else {
            setEmployee({
                id: '',
                firstName: '',
                lastName: '',
                address: '',
                state: '',
                zip: '',
                cellPhone: '',
                email: ''
            })
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const formValid = simpleValidator.current.allValid()

        if (! formValid) {
            simpleValidator.current.showMessages()
            forceUpdate(1)
        }

        if (id === undefined && formValid) {
            EmployeesService.addEmployee(employee).then(() => {
                console.log("Added employee")
                history.push('/employees')
            })
        } else if (id !== undefined && formValid) {
            EmployeesService.editEmployee(id, employee).then(() => {
                console.log("updated employee")
                history.push('/employees')
            })
        }
    }

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    const deleteEmployee = () => {
        EmployeesService.deleteEmployee(id).then(() => {
            console.log("Employee was deleted")
            history.push('/employees')
        })
    }

    const {
        firstName,
        lastName,
        address,
        state,
        zip,
        cellPhone,
        email
    } = employee
    return (
        <div className='justify-content-center form-container'>
            <div className='col-md-14 mx-auto mb-5'>
                <MDBCardHeader className='text-center text-uppercase py-4 mb-3'>
                    {
                    id !== undefined ? <h4>Edit Employee</h4> : <h4>New Employee</h4>
                } </MDBCardHeader>

                {
                id !== undefined ? (
                    <div className='text-right col-md-9 mx-auto'>
                        <MDBBtn className='btn-danger mt-0'
                            onClick={deleteEmployee}>Delete Employee</MDBBtn>
                    </div>
                ) : null
            } </div>

            <form className="col-md-9 mx-auto"
                onSubmit={
                    (e) => handleSubmit(e)
            }>
                <div className='row mb-4'>
                    <div className='col'>
                        <div className='form-outline'>
                            <MDBInput type='text' name="firstName"
                                value={firstName}
                                placeholder='First Name'
                                onChange={
                                    (e) => handleChange(e)
                                }
                                required
                                size='lg'/>
                            <div className='error'>
                                {
                                simpleValidator.current.message('First Name', employee.firstName, 'alpha_space|min:2|max:35')
                            }</div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='form-outline'>
                            <MDBInput type='text' name='lastName'
                                value={lastName}
                                placeholder='Last Name'
                                onChange={
                                    (e) => handleChange(e)
                                }
                                required
                                size='lg'/>
                            <div className='error'>
                                {
                                simpleValidator.current.message('Last Name', employee.lastName, 'alpha_space|min:2|max:35')
                            }</div>
                        </div>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col'>
                        <div className='form-outline'>
                            <MDBInput type='text' name='address'
                                value={address}
                                placeholder='Address'
                                onChange={
                                    (e) => handleChange(e)
                                }
                                required
                                size='lg'/>
                            <div className='error'>
                                {
                                simpleValidator.current.message('Address', employee.address, 'min:10|max:50')
                            }</div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='form-outline'>
                            <select className="browser-default custom-select custom-select-lg " name='state'
                                value={state}
                                onChange={
                                    (e) => handleChange(e)
                                }
                                required>
                                <option value="" disabled>State</option>
                                {
                                states.map((state, index) => (
                                    <option key={index}>
                                        {state}</option>
                                ))
                            } </select>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='form-outline'>
                            <MDBInput type='text' name='zip'
                                value={zip}
                                placeholder='Zip Code'
                                onChange={
                                    (e) => handleChange(e)
                                }
                                required
                                size='lg'/>
                            <div className='error'>
                                {
                                simpleValidator.current.message('Zip Code', employee.zip, 'numeric|min:5|max:9')
                            }</div>
                        </div>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col'>
                        <div className='form-outline'>
                            <MDBInput type='text' name='cellPhone'
                                value={cellPhone}
                                placeholder='Cell Phone'
                                onChange={
                                    (e) => handleChange(e)
                                }
                                required
                                size='lg'/>
                            <div className='error'>
                                {
                                simpleValidator.current.message('Cell Phone', employee.cellPhone, 'phone|min:10|max:10')
                            }</div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='form-outline'>
                            <MDBInput type='text' name='email'
                                value={email}
                                placeholder='Email Address'
                                onChange={
                                    (e) => handleChange(e)
                                }
                                required
                                size='lg'/>
                            <div className='error'>
                                {
                                simpleValidator.current.message('Email', employee.email, 'email|min:8|max:50')
                            }</div>
                        </div>
                    </div>
                </div>

                <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
                    <Link to='/employees'>
                        <MDBBtn outline color='info' className='btn mb-2 sized'>Cancel</MDBBtn>
                    </Link>
                    <MDBBtn type='submit' className='btn btn-info mb-2 sized'>Save</MDBBtn>
                </div>
            </form>

        </div>
    )

}

export default AddEditForm;
