import './index.css'
import {withRouter} from 'react-router-dom'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

const apiItem = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    api: apiItem.initial,
    similarProducts: {},
    skills: {},
    lifeAt: {},
    itemDet: {},
  }

  componentDidMount() {
    this.getItemDet()
  }

  getItemDet = async () => {
    const {history} = this.props
    const {location} = history
    console.log(location.pathname)
    const u = location.pathname
    this.setState({api: apiItem.progress})
    const idUrl = `https://apis.ccbp.in${u}`
    console.log(idUrl)
    const it = Cookies.get('jwt_token')
    const optionItem = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${it}`,
      },
    }
    const response = await fetch(idUrl, optionItem)
    if (response.ok) {
      const itemDate = await response.json()
      console.log(itemDate)
      const jd = itemDate.job_details

      const newItemDet = {
        companyLogoUrl: jd.company_logo_url,
        companyWebsiteUrl: jd.company_website_url,
        employmentType: jd.employment_type,
        id: jd.id,
        jobDescription: jd.job_description,
        lifeAtCompany: jd.life_at_company,
        location: jd.location,
        packagePerAnnum: jd.package_per_annum,
        rating: jd.rating,
        skills: jd.skills,
        title: jd.title,
      }
      const laCom = jd.life_at_company
      const newCom = {
        description: laCom.description,
        imageUrl: laCom.image_url,
      }
      const sk = jd.skills
      const newSk = sk.map(e => ({
        name: e.name,
        imageUrl: e.image_url,
      }))
      const sim = itemDate.similar_jobs
      const newSim = sim.map(e => ({
        companyLogoUrl: e.company_logo_url,
        employmentType: e.employment_type,
        id: e.id,
        jobDescription: e.job_description,
        location: e.location,
        rating: e.rating,
        title: e.title,
      }))
      console.log(newSim, 1)
      console.log(newSk)
      console.log(newCom)
      console.log(newItemDet)
      this.setState({
        similarProducts: newSim,
        skills: newSk,
        lifeAt: newCom,
        itemDet: newItemDet,
        api: apiItem.success,
      })
    } else {
      this.setState({api: apiItem.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderItemSuccess = () => {
    const {similarProducts, skills, lifeAt, itemDet} = this.state
    console.log(similarProducts)
    return (
      <div className="roles-ul-bg1">
        <div className="role-li-bg1" key={itemDet.id}>
          <div className="role-head-bg1">
            <img
              src={itemDet.companyLogoUrl}
              alt="job details company logo"
              className="com-img1"
            />

            <div className="head-bg1">
              <div className="heading-bg1">
                <h1 className="role-heading1">{itemDet.title}</h1>
              </div>
              <div className="star-bg1">
                <FaStar className="star-icon1" />
                <p className="rev-p1">{itemDet.rating}</p>
              </div>
            </div>
          </div>

          <div className="loc-sal-bg1">
            <div className="ls-bg21">
              <div className="loc-bg1">
                <div className="i-bg1">
                  <MdLocationOn className="loc-icon1" />
                </div>
                <p className="loc-p1">{itemDet.location}</p>
              </div>
              <div className="loc-bg1">
                <div className="i-bg1">
                  <BsBriefcaseFill className="loc-icon1" />
                </div>
                <p className="loc-p1">{itemDet.employmentType}</p>
              </div>
            </div>
            <p className="pak-p1">{itemDet.packagePerAnnum}</p>
          </div>
          <div className="hr-bg1">
            <hr />
          </div>
          <div className="des-bg1">
            <div className="des-visit-bg">
              <div className="pak-bg">
                <h1 className="pak-p12">Description</h1>
              </div>
              <a href={itemDet.companyWebsiteUrl} className="a-bg">
                Visit
                <FaExternalLinkAlt className="external" />
              </a>
            </div>
            <p className="des-p1">{itemDet.jobDescription}</p>
          </div>
          <div className="skills-bg">
            <h1 className="skills-h">Skills</h1>
            <ul className="skill-ul">
              {skills.map(e => (
                <li className="skill-li" key={e.name}>
                  <img src={e.imageUrl} alt={e.name} className="skill-img" />
                  <p className="ski-p">{e.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-bg">
            <h1 className="skills-h">Life at Company</h1>
            <div className="life-img-bg">
              <div className="life-p-bg">
                <p className="des-p1">{lifeAt.description}</p>
              </div>
              <img
                src={lifeAt.imageUrl}
                alt="Life At Company"
                className="life-img"
              />
            </div>
          </div>
        </div>
        <h1 className="sim-heading">Similar Jobs</h1>
        <ul className="simJobs-ul-bg">
          {similarProducts.map(e => (
            <li className="simJobs-li" key={e.id}>
              <div className="sim-role-head-bg1">
                <img
                  src={e.companyLogoUrl}
                  alt="similar job company logo"
                  className="sim-com-img12"
                />

                <div className="sim-head-bg1">
                  <div className="sim-heading-bg1">
                    <h1 className="sim-role-heading12">{e.title}</h1>
                  </div>
                  <div className="star-bg12">
                    <FaStar className="star-icon12" />
                    <p className="rev-p12">{e.rating}</p>
                  </div>
                </div>
              </div>
              <div className="simPro-bg1">
                <h1 className="simPro-h">Description</h1>
                <p className="simPro-p">{e.jobDescription}</p>
              </div>
              <div className="sim-loc-work-bg">
                <div className="sim-loc-bg">
                  <div className="sim-loc">
                    <MdLocationOn className="loc-icon1" />
                  </div>
                  <p className="loc-p1">{e.location}</p>
                </div>
                <div className="sim-loc-bg">
                  <div className="sim-loc">
                    <BsBriefcaseFill className="loc-icon1" />
                  </div>
                  <p className="loc-p1">{e.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderItemFailure = () => (
    <div className="fail-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-h">Oops! Something Went Wrong</h1>
      <p className="fail-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="pro-fail-btn" onClick={this.getItemDet}>
        Retry
      </button>
    </div>
  )

  renderItem = () => {
    const {api} = this.state
    switch (api) {
      case apiItem.success:
        return this.renderItemSuccess()
      case apiItem.failure:
        return this.renderItemFailure()
      case apiItem.progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="item-bg">{this.renderItem()}</div>
      </>
    )
  }
}
export default withRouter(JobItemDetails)
