import './index.css'
import {withRouter} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const goTojobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-bg">
      <Header />
      <div className="home-details">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <button type="button" className="home-btn" onClick={goTojobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default withRouter(Home)
