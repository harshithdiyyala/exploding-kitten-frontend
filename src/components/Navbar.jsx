// src/components/Navbar.jsx
import React from "react"
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import { useNavigate } from "react-router-dom"

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}>
      <Toolbar>
        <Typography
          variant="h4"
          style={{ flexGrow: 1, fontSize: "1rem" }}
          className="!text-lg !font-semibold">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
          Exploding Kitten
        </Typography>
        <Button
          color="inherit"
          variant="outlined"
          className="!mx-2"
          size="small"
          onClick={() => navigate("/game")}>
          Game
        </Button>
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          className="!mx-2"
          onClick={() => navigate("/leaderboard")}>
          Leaderboard
        </Button>
        <Button
          color="inherit"
          size="small"
          variant="outlined"
          className="!mx-2"
          onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
