import React, {useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import ErrorInput from '../components/ErrorInput';
import AlertMessage from '../components/AlertMessage';

const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Forgot = props => {

    const [valEmail, setValEmail] = useState('');
    const [valPassword, setValPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [emailStatus, setEmailStatus] = useState('');

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
    }

    const doChange = (props) => {
        props.preventDefault();

        let isError = doValidate();

        if (!isError) {
            alert('success');
            localStorage.setItem(valEmail, valPassword);
            window.location.replace("/");
        }
    }

    const [modal, setModal] = useState(false);

    const checkEmail = () => {
        const cekLogin = localStorage.getItem(valEmail);
        if (cekLogin) {
            toggle()
        } else {
            setEmailStatus('Email does not exist')
        }
    };

    const toggle = () => setModal(!modal);

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
                    <AlertMessage status={emailStatus} />
                    <Form id="my-form" name="my-form" autoComplete="false" className="m-3" >
                        <h1 className="text-center">Forgot Password</h1>
                        <hr />
                        <FormGroup>
                            <Label for="email">
                                Input your registered email address
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
                            <Button color="danger" onClick={checkEmail}>
                                Submit
                            </Button>
                        </FormGroup>

                        <FormGroup className="mt-5 text-center">
                            Already remeber your password? <Link to={'/'}>Sign in</Link>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Change Password</ModalHeader>
                <ModalBody>
                    <Form id="my-forgot-form" name="my-forgot-form" autoComplete="false" className="m-3"
                          onSubmit={(e) => doChange(e)}>
                        <FormGroup>
                            <Label for="password">
                                New Password
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
                            <Button color="primary" type='submit' block>
                                Change
                            </Button>{' '}
                        </FormGroup>
                        <FormGroup>
                            <Button color="secondary" onClick={toggle} block>
                                Cancel
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div >
    );
}

export default Forgot;
