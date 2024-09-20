// src/components/LoginPage.jsx
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { TextField, Button, Typography, Container, Box, Paper } from "@mui/material"

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(credentials))
    if (result.type === "auth/login/fulfilled") {
      navigate("/game")
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        className="p-6 mt-20 bg-darkcard">
        <Typography
          variant="h6"
          align="center"
          gutterBottom>
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="filled"
            fullWidth
            margin="normal"
            required
            size="small"
            InputProps={{ style: { backgroundColor: "#333" } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            fullWidth
            margin="normal"
            required
            size="small"
            InputProps={{ style: { backgroundColor: "#333" } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          {error && (
            <Typography
              color="error"
              className="mt-2"
              variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            size="small">
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Box
            mt={2}
            textAlign="center">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary">
                Register
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default LoginPage
