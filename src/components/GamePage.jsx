import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGame, playMove, resetGame } from "../store/gameSlice"
import { Button, Typography, Container, Box, Paper } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { debounce } from "lodash"
import CardComponent from "./CardComponent"
import Navbar from "./Navbar"

function GamePage() {
  const dispatch = useDispatch()
  const { gameId, message, gameOver, didWin, loading, lastDrawnCard } = useSelector((state) => state.game)

  useEffect(() => {
    if (!gameId) {
      dispatch(startGame())
    }
  }, [dispatch, gameId])

  // Debounced draw card function
  const debouncedDrawCard = useCallback(
    debounce(() => {
      dispatch(playMove(gameId))
    }, 500),
    [dispatch, gameId]
  )

  const handleDrawCard = () => {
    debouncedDrawCard()
  }

  const handleRestart = () => {
    dispatch(resetGame())
    dispatch(startGame())
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          className="p-6 mt-6 bg-darkcard">
          <Typography
            variant="h6"
            align="center"
            className=""
            gutterBottom>
            Exploding Kitten
          </Typography>
          {message && (
            <Box className="!mb-4">
              <Typography
                variant="body2"
                className="!text-base !my-2 !text-orange-400">
                {message}
              </Typography>
            </Box>
          )}
          {!gameOver && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDrawCard}
              disabled={loading}
              size="small">
              {loading ? "Drawing..." : "Draw Card"}
            </Button>
          )}
          {gameOver && (
            <>
              <Typography
                variant="body2"
                className={`!my-4 ${didWin ? "!text-green-400" : "!text-red-500"}`}>
                {didWin ? "Congratulations, you won!" : "Game Over!"}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleRestart}
                className="mt-4"
                size="small">
                Play Again
              </Button>
            </>
          )}
          {/* Animate the drawn card */}

          <AnimatePresence initial={false}>
            {lastDrawnCard && (
              <motion.div
                key={`${lastDrawnCard}-${gameId}-${Date.now()}`} // Ensure key is unique
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="mt-6 flex justify-center"
                onAnimationComplete={() => console.log("Animation Complete")}
                onExitComplete={() => console.log("Exit Animation Complete")}>
                <CardComponent cardType={lastDrawnCard} />
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </Container>
    </>
  )
}

export default GamePage
