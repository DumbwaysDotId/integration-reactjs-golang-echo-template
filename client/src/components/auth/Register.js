import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';

import { API } from '../../config/api';

export default function Register() {
  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);

      console.log("register success : ", response)

      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );
      setMessage(alert);
      setForm({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register!
        </Alert>
      );
      setMessage(alert);
      console.log("register failed : ", error);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4">
        <div
          style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700' }}
          className="mb-2"
        >
          Register
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              className="px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-login">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
