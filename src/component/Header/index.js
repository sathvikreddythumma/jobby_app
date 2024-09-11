import './index.css'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdHome} from 'react-icons/md'
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
        <ul className="home-job-bg">
          <Link to="/" className="link">
            <li className="home-p">Home</li>
            <MdHome className="mb-home-img" />
          </Link>
          <Link to="/jobs" className="link">
            <li className="home-p">Jobs</li>
            <BsBriefcaseFill className="mb-home-img" />
          </Link>
          <li onClick={logout}>
            <FiLogOut className="log-img" />
          </li>
        </ul>
        <button type="button" className="out-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
