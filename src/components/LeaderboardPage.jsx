// src/components/LeaderboardPage.jsx
import React, { useEffect, useState } from "react"
import axios from "../utils/axiosInstance"
import { Typography, Container, List, ListItem, ListItemText, Paper, Avatar } from "@mui/material"
import Navbar from "./Navbar"

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/users/leaderboard")
        setLeaderboard(response.data)
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error)
      }
    }
    fetchLeaderboard()
  }, [])

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          className="!p-6 !mt-6 !bg-darkcard">
          <Typography
            variant="h6"
            className="!text-center !mb-6 !capitalize">
            Leaderboard
          </Typography>
          <List>
            {leaderboard.map((user, index) => (
              <ListItem key={user._id}>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <Avatar className="!text-white">{user.username[0]}</Avatar>
                      {user.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="textSecondary">
                      Points: {user.points}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  )
}

export default LeaderboardPage
