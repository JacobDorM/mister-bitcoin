import { useDispatch } from 'react-redux'
import { userService } from '../services/userService'
import { utilService } from '../services/utilService'
import { FormTemplate } from '../cmps/FormTemplate'
import { login, signup } from '../store/actions/authActions'
import { useForm } from '../customHooks/useForm'

export const Signup = () => {
  const dispatch = useDispatch()

  const [signupUser, handleChangeSignupUser, setSignupUser] = useForm(userService.getEmpty())
  const [loginUser, handleChangeLoginUser] = useForm(null)

  const hookOnSubmit = utilService.hookOnSubmit

  const submitSignup = (e) => {
    e.preventDefault()
    dispatch(signup(signupUser))
    setSignupUser(userService.getEmpty())
  }

  const selectedFormFieldsSignup = ['fullname', 'username', 'password']
  const selectedFormFieldsLogin = ['username', 'password']

  const onSubmitSignup = { action: submitSignup, forHtml: 'Signup' }
  const onSubmitLogin = { action: (e) => hookOnSubmit(e, dispatch(login(loginUser))), forHtml: 'Login' }

  return (
    <section className="flex align-center column space-around">
      <FormTemplate value={signupUser} selectedFormFields={selectedFormFieldsSignup} onSubmit={onSubmitSignup} onChange={handleChangeSignupUser} />
      <div>Or</div>
      <FormTemplate value={loginUser} selectedFormFields={selectedFormFieldsLogin} onSubmit={onSubmitLogin} onChange={handleChangeLoginUser} />
    </section>
  )
}
