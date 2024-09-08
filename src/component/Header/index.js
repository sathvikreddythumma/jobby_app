import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bg">
      <div className="nav-outside-bg">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-img"
          />
        </Link>
        <div className="home-job-bg">
          <Link to="/" className="link">
            <p className="home-p">Home</p>
          </Link>
          <Link to="/jobs" className="link">
            <p className="home-p">Jobs</p>
          </Link>
        </div>
        <button type="button" className="out-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
