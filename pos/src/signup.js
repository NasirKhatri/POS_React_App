import React from "react";
import NavigationBar from "./navbar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    FirstName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    LastName: Yup.string().min(2, 'Too Short').max(20, 'Too Long').required('Required'),
    Email: Yup.string().email('Invalid Email').required('Required'),
    Password: Yup.string().min(6, 'Too Short').matches(/[A-Z]/, 'Must Contain Atleast One Upper Case Letter').matches(/[a-z]/, 'Must Contain Atleast One Lower Case Letter').matches(/[0-9]/, 'Must Contain Atleast One Numeric Value').matches(/[!@#$&]/, 'Must Contain Atlease One Special Character'),
    ConfirmPassword: Yup.string().oneOf([Yup.ref('Password'), null], 'Passwords Must Match')
})

const initialValues = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
}

const onSubmit = (values) => {
    console.log(values);
}


const Signup = () => {
    return (
        <>
            <NavigationBar />
            <div className="jumbotron">
                <h3>Registration</h3>
            </div>
            <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={(values) => onSubmit(values)}>
                <Form>
                    <Field name='FirstName' />
                    <ErrorMessage name='FirstName' />
                    <Field name='LastName' />
                    <ErrorMessage name='LastName' />
                    <Field name='Email' />
                    <ErrorMessage name='Email' />
                    <Field name='Password' />
                    <ErrorMessage name='Password' />
                    <Field name='ConfirmPassword' />
                    <ErrorMessage name='ConfirmPassword' />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default Signup;