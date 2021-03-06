import React from "react";
import NavigationBar from "./navbar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Container, Button } from 'react-bootstrap'
import axios from "axios";
import { useMutation } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from "react-router";

const SignupSchema = Yup.object().shape({
    FirstName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    LastName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    Email: Yup.string().email('Invalid Email').required('Required'),
    BrandName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    Password: Yup.string().min(6, 'Too Short').matches(/[A-Z]/, 'Must Contain Atleast One Upper Case Letter').matches(/[a-z]/, 'Must Contain Atleast One Lower Case Letter').matches(/[0-9]/, 'Must Contain Atleast One Numeric Value').matches(/[!@#$&]/, 'Must Contain Atlease One Special Character').required('Required'),
    ConfirmPassword: Yup.string().oneOf([Yup.ref('Password'), null], 'Passwords Must Match').required('Required')
})

const initialValues = {
    FirstName: '',
    LastName: '',
    Email: '',
    BrandName: '',
    Password: '',
    ConfirmPassword: ''
}

const Registration = (values) => {
    return axios.post('Signup', values);
}


const Signup = () => {
    const mutation = useMutation(Registration);

    if(mutation.isSuccess) {
        alert('You Have Been Registered! Please Login');
        return (
            <Navigate to="/Login" />
        )
    }

    return (
        <>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Registration</h3>
            </div>
            <Container>
                <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={(values) => mutation.mutate(values)}>
                        <Form>
                        <div className="d-flex flex-column">
                            <label className="mt-3 formLabel">First Name</label>
                            <Field name='FirstName' className="inputField" />
                            <div className="errorMessage"><ErrorMessage name='FirstName' /></div>
                            <label className="mt-3 formLabel">Last Name</label>
                            <Field name='LastName' className="inputField" />
                            <div className="errorMessage"><ErrorMessage name='LastName' className="errorMessage" /></div>
                            <label className="mt-3 formLabel">Email</label>
                            <Field name='Email' className="inputField" />
                            <div className="errorMessage"><ErrorMessage name='Email' className="errorMessage" /></div>
                            <label className="mt-3 formLabel">Brand Name</label>
                            <Field name='BrandName' className="inputField" />
                            <div className="errorMessage"><ErrorMessage name='BrandName' className="errorMessage" /></div>
                            <label className="mt-3 formLabel">Password</label>
                            <Field name='Password' type="password" className="inputField" />
                            <div className="errorMessage"><ErrorMessage name='Password' className="errorMessage" /></div>
                            <label className="mt-3 formLabel">Confirm Password</label>
                            <Field name='ConfirmPassword' type="password" className="inputField" />
                            <div className="errorMessage"><ErrorMessage name='ConfirmPassword' className="errorMessage" /></div>
                        </div>
                        <Button type="submit" variant="primary" className="mt-5 mr-3" style={{ float: 'right' }}>
                            Submit
                        </Button>
                        {mutation.isLoading ? <><br /><CircularProgress /></> : null}
                        {mutation.isError ? <><br /><div className="errorMessage">{mutation.error.response.data}</div></> : null}
                    </Form>
                </Formik>
            </Container>
        </>
    )
}

export default Signup;