import React, {useState} from 'react';
import {Alert, Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import ErrorInput from '../components/ErrorInput';

const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const AlertMessage = (props) => {
    const { status } = props;
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    return status.length > 0 && <Alert color="danger" isOpen={visible} toggle={onDismiss}>
        {status}
    </Alert>
}

const Login = props => {

    const [valEmail, setValEmail] = useState('');
    const [valPassword, setValPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const doValidate = () => {
        let error = false;
        setErrorEmail(null)
        setErrorPassword(null)

        if (valEmail.length === 0) {
            error = true;
            setErrorEmail('Email is required');
        } else if (!emailPattern.test(valEmail)) {
            error = true;
            setErrorEmail('Invalid email format');
        }

        if (valPassword.length === 0) {
            error = true;
            setErrorPassword('Password is required');
        }

        return error;
    }

    const doInput = (props) => {
        const input = props.target;
        if (input.name === 'email') {
            setValEmail(input.value)
        } else if (input.name === 'password') {
            setValPassword(input.value)
        }
        doValidate()
    }

    const doLogin = (props) => {
        props.preventDefault();

        let isError = doValidate();
        if (!isError) {
            const cekLogin = localStorage.getItem(valEmail);
            if (cekLogin && cekLogin === valPassword) {
                alert('Login success')
                window.location.replace("/home");
            } else {
                setLoginStatus('Email or Password is invalid')
            }
        }
    }

    return (
        <div>
            <Row className="mt-5">
                <Col
                    className="bg-light border"
                    md={{
                        offset: 3,
                        size: 6
                    }}
                    sm="12"
                >
                    <AlertMessage status={loginStatus} />
                    <Form id="my-form" name="my-form" autoComplete="false" className="m-3" onSubmit={(e) => doLogin(e)} >
                        <h1 className="text-center">Login</h1>
                        <hr />
                        <FormGroup>
                            <Label for="email">
                                Email address
                            </Label>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                autoComplete="false"
                                value={valEmail}
                                onChange={(obj) => doInput(obj)}
                                invalid={Boolean(errorEmail)}
                            />
                            <ErrorInput errorMessage={errorEmail} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="false"
                                value={valPassword}
                                onChange={(obj) => doInput(obj)}
                                invalid={Boolean(errorPassword)}
                            />
                            <ErrorInput errorMessage={errorPassword} />
                        </FormGroup>

                        <FormGroup className="mb-5">
                            <Link to={'/forgot-password'}>Forgot your password?</Link>
                        </FormGroup>

                        <FormGroup>
                            <Button type='submit' color='primary' block>Submit</Button>
                        </FormGroup>

                        <FormGroup className="mt-5 text-center">
                            Don't have an accout? <Link to={'/registration'}>Sign up</Link>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>

        </div >
    );
}

export default Login;
