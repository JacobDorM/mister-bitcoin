export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  sortBy,
  onChange,
  onSubmit,
  filter,
  hookOnChange,
  hookOnSubmit,
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function makeId(length = 5) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function sortBy(entities, field) {
  if (typeof entities[0]?.[field] === 'string') {
    return entities.sort((a, b) => {
      if (a[field].toLocaleLowerCase() < b[field].toLocaleLowerCase()) {
        return -1
      }
      if (a[field].toLocaleLowerCase() > b[field].toLocaleLowerCase()) {
        return 1
      }
      return 0
    })
  } else {
    return entities.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1
      }
      if (a[field] > b[field]) {
        return 1
      }
      return 0
    })
  }
}

async function onChange(event, thisComp, entity) {
  const { target } = event
  const field = target.name
  const value = target.type === 'number' ? +target.value || '' : target.value
  thisComp.setState((prevState) => ({ [entity]: { ...prevState[entity], [field]: value } }))
}

async function hookOnChange(event, setState) {
  const { target } = event
  const field = target.name
  const value = target.type === 'number' ? +target.value || '' : target.value
  setState((prevState) => ({ ...prevState, [field]: value }))
}

async function onSubmit(event, thisComp, action, entity) {
  event.preventDefault()
  thisComp.props[action]({ ...thisComp.state[entity] })
}

function hookOnSubmit(event) {
  event.preventDefault()
}

function filter(filterBy, entities) {
  return entities.filter((entity) => {
    let isMatch = true
    Object.entries(filterBy).forEach(([key, value]) => (isMatch = isMatch && entity[key].toLowerCase().includes(value.toLowerCase())))
    return isMatch
  })
}
