import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService'
import { utilService } from '../services/utilService'
import { FormTemplate } from '../cmps/FormTemplate'
import { login, signup } from '../store/actions/authActions'

export class _Signup extends Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    const user = await userService.getEmpty()
    this.setState({ user })
  }

  render() {
    const onChange = utilService.onChange
    const onSubmit = utilService.onSubmit

    const selectedFormFields = ['fullname', 'username', 'password']
    const onSubmitSignup = { action: (e) => onSubmit(e, this, 'signup', 'user'), forHtml: 'Signup' }
    const onSubmitLogin = { action: (e) => onSubmit(e, this, 'login', 'user'), forHtml: 'Login' }

    return (
      <section>
        <FormTemplate selectedFormFields={selectedFormFields} onSubmit={onSubmitSignup} onChange={(e) => onChange(e, this, 'user')} />
        <div>Or</div>
        <FormTemplate selectedFormFields={selectedFormFields} onSubmit={onSubmitLogin} onChange={(e) => onChange(e, this, 'user')} />
      </section>
    )
  }
}

const mapDispatchToProps = {
  login,
  signup,
}

export const Signup = connect(null, mapDispatchToProps)(_Signup)
