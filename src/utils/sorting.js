export default function sorting (type, method, a, b) {
  switch (type) {
    case 'string':
      switch (method) {
        case 'top':
          return stringSorting(a, b)
        case 'bottom':
          return stringSorting(b, a)
      }
      break
    case 'date':
      switch (method) {
        case 'top':
          return dateSorting(a, b)
        case 'bottom':
          return dateSorting(b, a)
      }
      break
    case 'dateTime':
      switch (method) {
        case 'top':
          return dateTimeSorting(a, b)
        case 'bottom':
          return dateTimeSorting(b, a)
      }
      break
  }
}

function dateSorting (a, b) {
  return new Date(a.split('.').reverse().join('-')) - new Date(b.split('.').reverse().join('-'))
}

function stringSorting (a, b) {
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  return 0
}

function dateTimeSorting (a, b) {
  if (a === '' || b === '') {
    if (a === '' && b !== '') {
      return -1
    } else if (a !== '' && b === '') {
      return 1
    } else {
      return 0
    }
  } else {
    const dateTimeA = a.split(' ')
    const dateTimeB = b.split(' ')
    const dateTimeObjectA = new Date(dateTimeA[0].split('.').reverse().join('-')).setHours(Number(dateTimeA[1].split(':')[0]), Number(dateTimeA[1].split(':')[1]))
    const dateTimeObjectB = new Date(dateTimeB[0].split('.').reverse().join('-')).setHours(Number(dateTimeB[1].split(':')[0]), Number(dateTimeB[1].split(':')[1]))
    return dateTimeObjectA - dateTimeObjectB
  }
}
