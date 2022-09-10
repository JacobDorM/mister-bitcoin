import { Component } from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/userService'
import { utilService } from '../services/utilService'
import { FormTemplate } from '../cmps/FormTemplate'
import { login, signup } from '../store/actions/authActions'

export class _Signup extends Component {
  state = {
    signupUser: null,
    loginUser: null,
  }

  async componentDidMount() {
    const signupUser = await userService.getEmpty()
    this.setState({ signupUser })
  }

  render() {
    const onChange = utilService.onChange
    const onSubmit = utilService.onSubmit

    const selectedFormFields = ['fullname', 'username', 'password']
    const onSubmitSignup = { action: (e) => onSubmit(e, this, 'signup', 'signupUser'), forHtml: 'Signup' }
    const onSubmitLogin = { action: (e) => onSubmit(e, this, 'login', 'loginUser'), forHtml: 'Login' }

    return (
      <section>
        <FormTemplate value={this.state.signupUser} selectedFormFields={selectedFormFields} onSubmit={onSubmitSignup} onChange={(e) => onChange(e, this, 'signupUser')} />
        <div>Or</div>
        <FormTemplate value={this.state.loginUser} selectedFormFields={selectedFormFields} onSubmit={onSubmitLogin} onChange={(e) => onChange(e, this, 'loginUser')} />
      </section>
    )
  }
}

const mapDispatchToProps = {
  login,
  signup,
}

export const Signup = connect(null, mapDispatchToProps)(_Signup)
