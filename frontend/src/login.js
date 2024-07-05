import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Access navigate function for navigation

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = (values, { setSubmitting }) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        alert(data.message); // Show success message (optional)
        navigate('/home'); // Navigate to homepage
      } else {
        alert(data.message); // Show error message (optional)
      }
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
      setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <label htmlFor="email">Email Address</label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email" component="div" />

        <label htmlFor="password">Password</label>
        <Field type="password" id="password" name="password" />
        <ErrorMessage name="password" component="div" />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default Login;
