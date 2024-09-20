// src/components/CardComponent.jsx
import React from "react"
import { motion } from "framer-motion"
import { Typography, Card } from "@mui/material"
import PetsIcon from "@mui/icons-material/Pets" // Cat icon
import BlockIcon from "@mui/icons-material/Block" // Defuse icon
import ShuffleIcon from "@mui/icons-material/Shuffle" // Shuffle icon
import WarningIcon from "@mui/icons-material/Warning" // Bomb icon

function CardComponent({ cardType }) {
  const cardData = {
    CAT: {
      name: "Cat Card",
      icon: (
        <PetsIcon
          style={{ fontSize: 50 }}
          color="primary"
        />
      ),
      color: "#3a3a3a",
    },
    DEFUSE: {
      name: "Defuse Card",
      icon: (
        <BlockIcon
          style={{ fontSize: 50 }}
          color="secondary"
        />
      ),
      color: "#3a3a3a",
    },
    SHUFFLE: {
      name: "Shuffle Card",
      icon: (
        <ShuffleIcon
          style={{ fontSize: 50 }}
          color="primary"
        />
      ),
      color: "#3a3a3a",
    },
    BOMB: {
      name: "Exploding Kitten",
      icon: (
        <WarningIcon
          style={{ fontSize: 50 }}
          color="error"
        />
      ),
      color: "#3a3a3a",
    },
  }

  const { name, icon, color } = cardData[cardType]

  return (
    <motion.div
      className="relative w-32 h-48"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: 180 }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1000 }}>
      {/* Front Side (Card Back) */}
      <motion.div
        className="absolute w-full h-full bg-gray-700 rounded-lg flex items-center justify-center"
        style={{ backfaceVisibility: "hidden" }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180 }}
        transition={{ duration: 0.8 }}>
        <Typography variant="body2">Card Back</Typography>
      </motion.div>

      {/* Back Side (Card Front) */}
      <motion.div
        className="absolute w-full h-full rounded-lg flex flex-col items-center justify-center"
        style={{ backfaceVisibility: "hidden", rotateY: 180, backgroundColor: color }}
        initial={{ rotateY: -180 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.8 }}>
        {icon}
        <Typography
          variant="body2"
          className="text-center mt-2">
          {name}
        </Typography>
      </motion.div>
    </motion.div>
  )
}

export default CardComponent
