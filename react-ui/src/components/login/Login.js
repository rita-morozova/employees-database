import React, {useState, useRef} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {useHistory} from 'react-router-dom';
import AuthService from '../../services/AuthService';
import {
    Form,
    Grid,
    Button,
    Header,
    Segment
} from "semantic-ui-react";


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const simpleValidator = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState()
    const [message, setMessage] = useState('')

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const formValid = simpleValidator.current.allValid()

        if (! formValid) {
            simpleValidator.current.showMessages()
            forceUpdate(1)
        }
        if (formValid) {
            AuthService.login(email, password).then(() => {
                history.push('/employees')
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

                setMessage(resMessage)
            })
        }
    }

    return (
        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={
                {maxWidth: 450}
            }>
                <Header as='h2' textAlign='center'
                    style={
                        {marginTop: '20px'}
                }>Log In</Header>
                <Form size='large'
                    onSubmit={
                        (e) => handleLogin(e)
                }>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' type="email" name="email"
                            value={email}
                            placeholder="E-mail"
                            onChange={
                                (e) => onChangeEmail(e)
                            }
                            required/>
                        <div className='error'>
                            {
                            simpleValidator.current.message('Email', email, 'email|min:8|max:35')
                        }</div>
                        <br/>

                        <Form.Input fluid icon='lock' iconPosition='left' type="password" name="password"
                            value={password}
                            placeholder="Password"
                            onChange={
                                (e) => onChangePassword(e)
                            }
                            required/>
                        <div className='error'>
                            {
                            simpleValidator.current.message('Password', password, 'alpha_num|min:8|max:35')
                        }</div>
                        <br/>

                        <Button fluid size='large' type="submit"
                            style={
                                {
                                    backgroundColor: '#33b5e5',
                                    color: 'white',
                                    marginBottom: '5px'
                                }
                        }>LOG IN</Button>
                        {
                        message && (
                            <div className='form-group'>
                                <div className='error' role='alert'>
                                    {message} </div>
                            </div>
                        )
                    } </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default Login;
