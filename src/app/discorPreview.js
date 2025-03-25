"use client"

import { Box, Text } from "@mantine/core"
import { useMemo } from "react"




// This component parses ANSI codes and renders them as styled text
export function DiscordPreview({ content }) {
  const parsedContent = useMemo(() => parseAnsiText(content), [content])

  return (
    <Box
      sx={{
        backgroundColor: "#36393f",
        padding: "10px",
        borderRadius: "4px",
        fontFamily: "monospace",
        color: "white",
        minHeight: "500px",
      }}
    >
      {parsedContent}
    </Box>
  )
}

// Parse ANSI codes and convert to styled components
function parseAnsiText(text) {
  const parts = text.split(/(\u001b\[\d+m)/g)
  const result = []

  let currentStyle = {}

  parts.forEach((part, index) => {
    if (part.startsWith("\u001b[")) {
      const code = Number.parseInt(part.slice(2, -1))

      if (code === 0) {
        // Reset
        currentStyle = {}
      } else if (code === 1) {
        // Bold
        currentStyle.fontWeight = 700
      } else if (code === 4) {
        // Underline
        currentStyle.textDecoration = "underline"
      } else if (code >= 30 && code <= 37) {
        // Foreground color
        const colorMap = {
          30: "#6b7280", // Gray
          31: "#ef4444", // Red
          32: "#a3e635", // Green
          33: "#eab308", // Yellow
          34: "#3b82f6", // Blue
          35: "#ec4899", // Magenta
          36: "#4ade80", // Cyan
          37: "#ffffff", // White
        }
        currentStyle.color = colorMap[code]
      } else if (code >= 40 && code <= 47) {
        // Background color
        const bgColorMap = {
          40: "#0f172a", // Dark Blue
          41: "#ea580c", // Orange
          42: "#64748b", // Gray
          43: "#94a3b8", // Light Gray
          44: "#cbd5e1", // Light Blue
          45: "#8b5cf6", // Purple
          46: "#a1a1aa", // Light Green
          47: "#fef9c3", // Cream
        }
        currentStyle.backgroundColor = bgColorMap[code]
      }
    } else if (part) {
      result.push(
        <Text
          key={index}
          span
          style={{
            color: currentStyle.color || "white",
            backgroundColor: currentStyle.backgroundColor,
            fontWeight: currentStyle.fontWeight,
            textDecoration: currentStyle.textDecoration,
            display: "inline",
          }}
        >
          {part}
        </Text>,
      )
    }
  })

  return result
}

