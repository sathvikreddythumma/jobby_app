import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <div className="not-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-img"
      />
      <h1 className="not-h">Page Not Found</h1>
      <p className="not-p">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound
