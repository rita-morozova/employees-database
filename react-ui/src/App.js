import React, {useState, useEffect} from 'react';
import './App.css';
import EmployeesList from './components/employees-list/EmployeesList';
import Login from './components/login/Login';
import AddEditForm from './components/add-edit-form/AddEditForm';
import {Route, Switch, Link} from "react-router-dom";
import AuthService from './services/AuthService';

function App() {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        setInterval(() => {
            const user = AuthService.getCurrentUser()
            setCurrentUser(user)
        }, [])
    }, 5000)

    const logOut = () => {
        AuthService.logout()
    }

    return (
        <div className="App">
            <nav className='navbar navbar-expand navbar-dark bg-info'>
                <Link to={'/'}
                    className='navbar-brand'>
                    React UI
                </Link>
                <div className='navbar-nav mr-auto'></div>
                {
                currentUser ? (
                    <div className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <a href='/' className='nav-link'
                                onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (null)
            } </nav>
            <div>
                <Switch>
                    <Route exact path="/"
                        component={Login}/>
                    <Route exact path="/employees"
                        component={EmployeesList}/>
                    <Route path="/employees/add"
                        component={AddEditForm}/>
                    <Route path="/employee/:id"
                        component={AddEditForm}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
