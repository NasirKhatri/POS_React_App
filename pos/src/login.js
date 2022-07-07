import React from "react";
import NavigationBar from "./navbar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Container, Button } from 'react-bootstrap'

const LoginSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid Email').required('Required'),
    Password: Yup.string().required('Required'),
})

const initialValues = {
    Email: '',
    Password: '',
}

const onSubmit = (values) => {
    console.log(values);
}


const Login = () => {
    return (
        <>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Login</h3>
            </div>
            <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={(values) => onSubmit(values)}>
                <Container>
                    <Form>
                        <div className="d-flex flex-column">
                            <label className="mt-3 formLabel">Email</label>
                            <Field name='Email' className="inputField"/>
                            <div  className="errorMessage"><ErrorMessage name='Email' className="errorMessage"/></div>
                            <label className="mt-3 formLabel">Password</label>
                            <Field name='Password' type="password" className="inputField"/>
                            <div  className="errorMessage"><ErrorMessage name='Password' className="errorMessage"/></div>
                        </div>
                        <Button type="submit" variant="primary" className="mt-5 mr-3" style={{float: 'right'}}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Formik>
        </>
    )
}

export default Login;