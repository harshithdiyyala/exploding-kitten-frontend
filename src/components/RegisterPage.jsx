// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(credentials));
    if (result.type === 'auth/register/fulfilled') {
      navigate('/game');
    }
  };

  return (
    <Container maxWidth="xs" className="mt-20">
      <Typography variant="h4" className="text-center mb-6">
        Exploding Kitten - Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          required
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        {error && (
          <Typography color="error" className="mt-2">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className="mt-4"
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <Box className="mt-4 text-center">
          <Typography>
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
}

export default RegisterPage;
