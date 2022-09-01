export const formService = {
  query,
}

async function query() {
  return [
    { name: 'fullname', forHtml: 'Full name', placeholder: 'fullname...' },
    { name: 'username', forHtml: 'Username', placeholder: 'username...' },
    { name: 'password', forHtml: 'Password', placeholder: 'password...' },
    { name: 'name', forHtml: 'Name', placeholder: 'name...' },
    { name: 'email', forHtml: 'Email', placeholder: 'email...' },
    { name: 'phone', forHtml: 'Phone', placeholder: 'phone...' },
  ]
}
