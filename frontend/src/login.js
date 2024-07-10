import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate(); // Access navigate function for navigation
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to toggle between login and forgot password views

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message); // Show success message (optional)
      localStorage.setItem('token', data.token); // Store the token
      navigate('/home'); // Navigate to home page
    } catch (error) {
      console.error('Error:', error);
      setFieldError('general', error.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message); // Show success message (optional)
    } catch (error) {
      console.error('Error:', error);
      setFieldError('general', error.message || 'Request failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">{showForgotPassword ? 'Forgot Password' : 'Login'}</h3>
            </div>
            <div className="card-body">
              {showForgotPassword ? (
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Email is required')
                  })}
                  onSubmit={handleForgotPasswordSubmit}
                >
                  {({ isSubmitting, errors }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <Field type="email" id="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>

                      {errors.general && <div className="text-danger mb-3">{errors.general}</div>}

                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <button type="button" className="btn btn-link" onClick={() => setShowForgotPassword(false)}>
                          Back to Login
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting, errors }) => (
                    <Form>
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

                      {errors.general && <div className="text-danger mb-3">{errors.general}</div>}

                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <button type="button" className="btn btn-link" onClick={() => setShowForgotPassword(true)}>
                          Forgot Password?
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
