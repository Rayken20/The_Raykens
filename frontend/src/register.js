import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const navigate = useNavigate(); // Access navigate function for navigation

  const initialValues = {
    fullname: '',
    email: '',
    password: '',
    id_passport_no: '',
    role: ''
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    id_passport_no: Yup.number().required('Passport number is required').positive('Must be a positive number'),
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="fullname" className="form-label">Full Name</label>
                      <Field type="text" id="fullname" name="fullname" className="form-control" />
                      <ErrorMessage name="fullname" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <Field type="email" id="email" name="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Field type="password" id="password" name="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="id_passport_no" className="form-label">Passport Number</label>
                      <Field type="number" id="id_passport_no" name="id_passport_no" className="form-control" />
                      <ErrorMessage name="id_passport_no" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">Role</label>
                      <Field as="select" id="role" name="role" className="form-control">
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="text-danger" />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
