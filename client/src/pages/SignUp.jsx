import React, { useEffect } from 'react'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { user } from '../features/slice'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  })
  const [err, setError] = useState({})
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate()
  const [password, setPassword] = useState({
    password: '',
    showPassword: false
  })
  const dispatch = useDispatch()

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword })
  }

  const handleMouseDownPassword = e => {
    e.preventDefault()
  }

  const handlePasswordChange = e => {
    setPassword({ ...password, [e.target.name]: e.target.value })
  }

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setServerError(null)
    inputs.password = password.password
    setError(validate(inputs))
    if (
      inputs.username !== '' &&
      password.password !== '' &&
      inputs.email !== ''
    ) {
      try {
        const rest = await axios.post(
          'https://backend-sj2s.onrender.com/api/auth/signup',
          inputs
        )
        dispatch(user(rest.data))
        navigate('/home')
      } catch (err) {
        setServerError(err.response.data)
      }
    }
  }

  useEffect(() => {
    if (Object.keys(err).length === 0) {
    }
  }, [err])

  const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Username is required!'
    }
    if (!values.password) {
      errors.password = 'Password is required!'
    }
    if (!values.email) {
      errors.email = 'Email is required!'
    }
    return errors
  }

  const logins = useGoogleLogin({
    onSuccess: async respose => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`
            }
          }
        )
        dispatch(user(res.data.given_name))
        window.open(`https://backend-sj2s.onrender.com/auth/google/callback`, '_self')
      } catch (err) {
        console.log(err)
      }
    }
  })

  return (
    <div className='auth'>
      <h1 className='heading'>MERN Community</h1>
      <h1>SignUp</h1>
      <form>
        <input
          required
          type='text'
          placeholder='username'
          name='username'
          onChange={handleChange}
        />
        <p>{err.username}</p>
        <input
          required
          type='email'
          placeholder='email'
          name='email'
          m
          onChange={handleChange}
        />
        <p>{err.email}</p>
        <Input
          required
          type={password.showPassword ? 'text' : 'password'}
          placeholder='password'
          name='password'
          onChange={handlePasswordChange}
          value={password.password}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                style={{ height: '25px', width: '25px' }}
              >
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <p>{err.password}</p>
        <button onClick={handleSubmit}>Register</button>
        {serverError && <p style={{ fontSize: '15px' }}>{serverError}</p>}
        <span>or</span>
        <button onClick={logins}>Continue with google</button>
        <span>
          Do you have an account? <Link to='/'>Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register