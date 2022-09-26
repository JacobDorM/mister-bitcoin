import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../services/userService'
import { utilService } from '../services/utilService'
import { FormTemplate } from '../cmps/FormTemplate'
import { login, signup } from '../store/actions/authActions'

export const Signup = () => {
  const [signupUser, setSignupUser] = useState(null)
  const [loginUser, setLoginUser] = useState(null)
  const dispatch = useDispatch()

  const hookOnChange = utilService.hookOnChange
  const hookOnSubmit = utilService.hookOnSubmit

  const selectedFormFields = ['fullname', 'username', 'password']
  const onSubmitSignup = { action: (e) => hookOnSubmit(e, dispatch(signup(signupUser))), forHtml: 'Signup' }
  const onSubmitLogin = { action: (e) => hookOnSubmit(e, dispatch(login(loginUser))), forHtml: 'Login' }

  useEffect(() => {
    getEmptyUser()
  }, [])

  const getEmptyUser = async () => {
    const signupUser = await userService.getEmpty()
    setSignupUser(signupUser)
  }

  return (
    <section>
      <FormTemplate value={signupUser} selectedFormFields={selectedFormFields} onSubmit={onSubmitSignup} onChange={(e) => hookOnChange(e, setSignupUser)} />
      <div>Or</div>
      <FormTemplate value={loginUser} selectedFormFields={selectedFormFields} onSubmit={onSubmitLogin} onChange={(e) => hookOnChange(e, setLoginUser)} />
    </section>
  )
}
