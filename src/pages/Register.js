import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import ErrorInput from '../components/ErrorInput';

const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = props => {

    const [valEmail, setValEmail] = useState('');
    const [valPassword, setValPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

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
        } else if (valPassword.length < 8) {
            error = true;
            setErrorPassword('Password length minimum is 8');
        } else if (!passwordPattern.test(valPassword)) {
            error = true;
            setErrorPassword('Password format must contain uppercase, lowercase, number and symbol');
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

    const doRegis = (props) => {
        props.preventDefault();

        let isError = doValidate();

        if (!isError) {
            alert('success');
            localStorage.setItem(valEmail, valPassword);
            window.location.replace("/");
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
                    <Form id="my-form" name="my-form" autoComplete="false" className="m-3" onSubmit={(e) => doRegis(e)} >
                        <h1 className="text-center">Registration</h1>
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

                        <FormGroup>
                            <Button type='submit' color='primary' block>Submit</Button>
                        </FormGroup>

                        <FormGroup className="mt-5 text-center">
                            Already have an account? <Link to={'/'}>Sign in</Link>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>

        </div >
    );
}

export default Register;
