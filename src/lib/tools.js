const moment = require('moment-timezone')

const asyncForEach = async (elements, cb) => {
  for (let index = 0; index < elements.length; index += 1) {
    await cb(elements[index], index, elements)
  }
}

const createCSVString = (data, fields, fullObject = false) => {
  let result = ''
  if (data.length > 0) {
    const fieldNames = Object.keys(fields)
    const keys = []
    const allKeys = Object.keys(data[0])
    allKeys.forEach((originalKey) => {
      if (fieldNames.indexOf(originalKey) >= 0) {
        keys.push(originalKey)
      }
    })
    // Header row
    keys.forEach((currentKey, index) => {
      if (index > 0) {
        result += ','
      }
      result += fields[currentKey]
    })
    if (fullObject) {
      result += ',Object'
    }
    data.forEach((element) => {
      result += '\n'
      keys.forEach((key, index) => {
        if (index > 0) {
          result += ','
        }
        let formattedElement = element[key]
        if (element[key] instanceof Date) {
          formattedElement = moment(formattedElement).tz('America/Guatemala').format('YYYY-MM-DD HH:mm:ss')
        }

        if ((typeof formattedElement === 'string') && formattedElement.indexOf(',') >= 0) {
          formattedElement = `"${formattedElement}"`
        } else if (typeof formattedElement === 'object') {
          formattedElement = `"${JSON.stringify(formattedElement)}"`
        }
        result += formattedElement
      })

      if (fullObject) {
        result += `,"${JSON.stringify(element).replace(/"/g, '""')}"`
      }
    });
  }

  return result
  // csvConverter.json2csvAsync(data)
}



module.exports = {
  asyncForEach,
  createCSVString,
}