import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); // Access navigate function for navigation

  const initialValues = {
    fullname: '',
    email: '',
    password: '',
    passport_no: '',
    role: ''
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    passport_no: Yup.number().required('Passport number is required').positive('Must be a positive number'),
    role: Yup.string().required('Role is required')
  });

  const onSubmit = (values, { setSubmitting }) => {
    fetch('http://localhost:5000/register', {
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
      alert(data.message); // Show success message (optional)
      navigate('/login'); // Navigate to login page
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
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
        <label htmlFor="fullname">Full Name</label>
        <Field type="text" id="fullname" name="fullname" />
        <ErrorMessage name="fullname" component="div" />

        <label htmlFor="email">Email Address</label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email" component="div" />

        <label htmlFor="password">Password</label>
        <Field type="password" id="password" name="password" />
        <ErrorMessage name="password" component="div" />

        <label htmlFor="passport_no">Passport Number</label>
        <Field type="number" id="passport_no" name="passport_no" />
        <ErrorMessage name="passport_no" component="div" />

        <label htmlFor="role">Role</label>
        <Field as="select" id="role" name="role">
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Field>
        <ErrorMessage name="role" component="div" />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default Register;
