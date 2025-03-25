// // ANSI color codes for Discord
// export const ANSI_CODES = {
//     RESET: "\u001b[0m",
//     BOLD: "\u001b[1m",
//     UNDERLINE: "\u001b[4m",
  
//     // Foreground colors
//     FG_GRAY: "\u001b[30m",
//     FG_RED: "\u001b[31m",
//     FG_GREEN: "\u001b[32m",
//     FG_YELLOW: "\u001b[33m",
//     FG_BLUE: "\u001b[34m",
//     FG_MAGENTA: "\u001b[35m",
//     FG_CYAN: "\u001b[36m",
//     FG_WHITE: "\u001b[37m",
  
//     // Background colors
//     BG_DARK_BLUE: "\u001b[40m",
//     BG_ORANGE: "\u001b[41m",
//     BG_GRAY: "\u001b[42m",
//     BG_LIGHT_GRAY: "\u001b[43m",
//     BG_LIGHT_BLUE: "\u001b[44m",
//     BG_PURPLE: "\u001b[45m",
//     BG_LIGHT_GREEN: "\u001b[46m",
//     BG_CREAM: "\u001b[47m",
//   }
  
//   // Apply ANSI color to text
//   export function applyAnsiColor(text, colorCode) {
//     return `\u001b[${colorCode}m${text}${ANSI_CODES.RESET}`
//   }
  
//   // Apply bold formatting
//   export function applyBold(text) {
//     return `${ANSI_CODES.BOLD}${text}${ANSI_CODES.RESET}`
//   }
  
//   // Apply underline formatting
//   export function applyUnderline(text) {
//     return `${ANSI_CODES.UNDERLINE}${text}${ANSI_CODES.RESET}`
//   }
  
//   // Remove all ANSI codes from text
//   export function stripAnsiCodes(text) {
//     return text.replace(/\u001b\[\d+m/g, "")
//   }
  
  