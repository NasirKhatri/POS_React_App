import React from "react";
import NavigationBar from "./navbar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Container, Button } from 'react-bootstrap'
import { useMutation } from "react-query";
import { Navigate } from "react-router";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "./App";


const LoginSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid Email').required('Required'),
    Password: Yup.string().required('Required'),
})

const initialValues = {
    Email: '',
    Password: '',
}

const userLogin = (values) => {
    return axios.post('Login', values);
}


const Login = () => {
    const storeData = useContext(StoreContext);
    const mutation = useMutation(userLogin);

    if(mutation.isSuccess) {
        storeData.dispatchLogin({type: 'login'});
        console.log(storeData);
    }

    if(storeData.login.Auth) {
        return (<Navigate to="/" />);
    }

    else {
        return (
            <>
                <NavigationBar />
                <div className="jumbotron">
                    <h3>Login</h3>
                </div>
                <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={(values) => mutation.mutate(values)}>
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
                            <Button type="submit" disabled={mutation.isLoading} variant="primary" className="mt-5 mr-3" style={{float: 'right'}}>
                                {mutation.isLoading ? 'Wait' : 'Login'}
                            </Button>
                            {mutation.isError ? <><br /><div className="errorMessage">{mutation.error.response.data}</div></> : null}
                        </Form>
                    </Container>
                </Formik>
            </>
        )
    }

    
}

export default Login;