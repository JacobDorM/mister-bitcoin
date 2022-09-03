export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  sortBy,
  onChange,
  onSubmit,
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

function sortBy(arr, field) {
  return arr.sort((a, b) => {
    if (a[field].toLocaleLowerCase() < b[field].toLocaleLowerCase()) {
      return -1
    }
    if (a[field].toLocaleLowerCase() > b[field].toLocaleLowerCase()) {
      return 1
    }

    return 0
  })
}

async function onChange(event, thisComp, entity) {
  const { target } = event
  const field = target.name
  const value = target.type === 'number' ? +target.value || '' : target.value
  thisComp.setState(
    (prevState) => ({ [entity]: { ...prevState[entity], [field]: value } })
    // () => {
    //   console.log({ ...thisComp.state })
    // }
  )
}

function onSubmit(event, thisComp, action, entity) {
  event.preventDefault()
  thisComp.props[action]({ ...thisComp.state[entity] })
}
