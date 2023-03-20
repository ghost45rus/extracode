export function dateTimeFormat (dateTime, precision) {
  let formatedDateTime = ''

  if (!dateTime) {
    return formatedDateTime
  }

  switch (precision) {
    case 'date': // dd.mm.yyyy
      formatedDateTime = new Date(dateTime).toLocaleDateString()
      break
    case 'minutes': // dd.mm.yyyy hh:ii
      formatedDateTime = new Date(dateTime).toLocaleDateString() + ' ' + new Date(dateTime).toLocaleTimeString().slice(0, -3)
      break
    case 'seconds': // dd.mm.yyyy hh:ii:ss
      formatedDateTime = new Date(dateTime).toLocaleDateString() + ' ' + new Date(dateTime).toLocaleTimeString()
      break
    default:
      formatedDateTime = ''
      break
  }

  return formatedDateTime
}
