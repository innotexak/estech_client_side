import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomInput from '../component/reusable/inputText'

const RegistrationForm = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:8000/users/register', values);
            console.log('Registration successful:', response.data);
            alert(response.data.message)
        } catch (error) {
            alert( error?.response?.data?.message)
            console.error('Registration failed:', error?.response?.data);
        }
        setSubmitting(false);
    };

    return (
        <Formik
  initialValues={{
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword:''
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ isSubmitting }) => (
    <Form>
      <CustomInput placeholder="First Name" name="firstName" type="text" />
      <CustomInput placeholder="Last Name" name="lastName" type="text" />
      <CustomInput placeholder="Email" name="email" type="email" />
      <CustomInput placeholder="Password" name="password" type="password" />
      <CustomInput placeholder="confirm Password" name="confirmPassword" type="password" />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  )}
</Formik>

    );
};

export default RegistrationForm;
