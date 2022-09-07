export const formService = {
  query,
}

async function query() {
  return [
    { name: 'fullname', forHtml: 'Full name', placeholder: 'fullname...', type: 'text' },
    { name: 'username', forHtml: 'Username', placeholder: 'username...', type: 'text' },
    { name: 'password', forHtml: 'Password', placeholder: 'password...', type: 'text' },
    { name: 'name', forHtml: 'Name', placeholder: 'Search name...', type: 'text' },
    { name: 'email', forHtml: 'Email', placeholder: 'Search email...', type: 'text' },
    { name: 'phone', forHtml: 'Phone', placeholder: 'Search phone...', type: 'text' },
    { name: 'amount', forHtml: 'Amount', placeholder: 'Amount to transfer...', type: 'number' },
  ]
}
