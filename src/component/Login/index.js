import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'
import Header from '../Header'

class Login extends Component {
  state = {u: '', p: '', error: false, errorData: ''}

  userInput = event => {
    this.setState({u: event.target.value})
  }

  passwordInput = event => {
    this.setState({p: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  failure = err => {
    this.setState({error: true, errorData: err})
  }

  getFun = async () => {
    const {u, p} = this.state
    const userDetails = {
      username: `${u}`,
      password: `${p}`,
    }
    console.log(u, p, userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.success(data.jwt_token)
    } else {
      const data = await response.json()
      this.failure(data.error_msg)
      console.log(data)
    }
  }

  gettingResults = event => {
    event.preventDefault()
    this.getFun()
  }

  render() {
    const {error, errorData} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="login-card-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <form className="form-bg" onSubmit={this.gettingResults}>
            <div className="lab-inp-bg">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="input"
                onChange={this.userInput}
              />
            </div>
            <div className="lab-inp-bg">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input"
                onChange={this.passwordInput}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <div className="err-bg">
              {error ? <p className="error-p">* {errorData}</p> : ''}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(Login)
