export function epochToJsDate(ts) {
  //Returns short date in local format and timezone
  return (
    new Date(ts * 1000).toLocaleDateString()
  )
}

export function epochToJsTime(ts) {
  //Returns time in local format and timezone
  return (
    new Date(ts * 1000).toLocaleTimeString()
  )
}