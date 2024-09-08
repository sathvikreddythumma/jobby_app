import './index.css'
import Loader from 'react-loader-spinner'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentSalaryRanges from '../EmploymentSalaryRanges'

const apiStatus1 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

const apiStatus2 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiState1: apiStatus1.initial,
    apiState2: apiStatus2.initial,
    proDetList: {},
    rolesList: {},
    activeSalaryId: '',
    activeEmpId: '',
    pak: '',
    searchInput: '',
    ee: [],
  }

  componentDidMount() {
    this.profileDetails()
    this.roleDetails()
  }

  profileDetails = async () => {
    this.setState({
      apiState1: apiStatus1.progress,
    })
    const profileUrl = 'https://apis.ccbp.in/profile'
    const t = Cookies.get('jwt_token')
    const proOptions = {
      headers: {
        Authorization: `Bearer ${t}`,
      },
      method: 'GET',
    }
    const proResponse = await fetch(profileUrl, proOptions)
    if (proResponse.ok) {
      const proData = await proResponse.json()
      const oldPro = proData.profile_details
      const newPro = {
        name: oldPro.name,
        profileImageUrl: oldPro.profile_image_url,
        shortBio: oldPro.short_bio,
      }
      this.profileSuccess(newPro)
    } else {
      this.profileFailure()
    }
  }

  profileFailure = () => {
    this.setState({apiState1: apiStatus1.failure})
  }

  profileSuccess = proDet => {
    this.setState({apiState1: apiStatus1.success, proDetList: proDet})
  }

  roleDetails = async () => {
    const {pak, searchInput, activeSalaryId, activeEmpId, ee} = this.state
    console.log(ee)
    this.setState({
      apiState2: apiStatus2.progress,
    })
    const roleUrl = `https://apis.ccbp.in/jobs?employment_type=${ee}&minimum_package=${activeSalaryId}&search=${searchInput}`
    console.log(roleUrl)
    const rt = Cookies.get('jwt_token')
    const roleOptions = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${rt}`,
      },
    }
    const roleResponse = await fetch(roleUrl, roleOptions)
    if (roleResponse.ok) {
      const roleData = await roleResponse.json()
      const rl = roleData.jobs
      console.log(rl)
      const nRl = rl.map(e => ({
        companyLogoUrl: e.company_logo_url,
        employmentType: e.employment_type,
        id: e.id,
        jobDescription: e.job_description,
        location: e.location,
        packagePerAnnum: e.package_per_annum,
        rating: e.rating,
        title: e.title,
      }))
      console.log(nRl)

      this.rolesSuccess(nRl)
    } else {
      this.roleFailure()
    }
  }

  roleFailure = () => {
    this.setState({
      apiState2: apiStatus2.failure,
    })
  }

  rolesSuccess = nRl => {
    this.setState({
      apiState2: apiStatus2.success,
      rolesList: nRl,
    })
  }

  renderProfile = () => {
    const {proDetList} = this.state
    return (
      <div className="profile-bg">
        <img src={proDetList.profileImageUrl} alt="profile" className="pro" />
        <h1 className="pro-h">{proDetList.name}</h1>
        <p className="pro-p">{proDetList.shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <div className="pro-fail-bg">
      <button
        type="button"
        className="pro-fail-btn"
        onClick={this.profileDetails}
      >
        Retry
      </button>
    </div>
  )

  setEmpId = empId => {
    const {ee} = this.state

    const notInList = ee.filter(e => e === empId)
    if (notInList.length === 0) {
      this.setState(prev => ({ee: [...prev.ee, empId]}), this.roleDetails)
    } else {
      const filteredData = ee.filter(e => e !== empId)
      this.setState(prev => ({ee: filteredData}), this.roleDetails)
    }
  }

  checkFun = sId => {
    console.log(sId)
    this.setState({activeSalaryId: sId}, this.roleDetails)
  }

  searchBtn = event => {
    console.log(event.key)
    this.setState({searchInput: event.target.value})
  }

  getDet = event => {
    this.roleDetails()
  }

  renderProfileList() {
    const {apiState1} = this.state
    switch (apiState1) {
      case apiStatus1.success:
        return this.renderProfile()
      case apiStatus1.failure:
        return this.renderProfileFailure()
      case apiStatus1.progress:
        return this.renderLoader()

      default:
        return null
    }
  }

  renderRoleSuccess = () => {
    const {rolesList} = this.state
    const len = rolesList.length === 0
    return len ? (
      <div className="notFound-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="not-img"
        />
        <h1 className="not-h">No Jobs Found</h1>
        <p className="not-p">We could not find any jobs. Try others filters</p>
      </div>
    ) : (
      <ul className="roles-ul-bg">
        {rolesList.map(e => (
          <Link to={`/jobs/${e.id}`} className="link-bg">
            <li className="role-li-bg" key={e.id}>
              <div className="role-head-bg">
                <img
                  src={e.companyLogoUrl}
                  alt="company logo"
                  className="com-img"
                />

                <div className="head-bg">
                  <div className="heading-bg">
                    <h1 className="role-heading">{e.title}</h1>
                  </div>
                  <div className="star-bg">
                    <FaStar className="star-icon" />
                    <p className="rev-p">{e.rating}</p>
                  </div>
                </div>
              </div>

              <div className="loc-sal-bg">
                <div className="ls-bg2">
                  <div className="loc-bg">
                    <div className="i-bg">
                      <MdLocationOn className="loc-icon" />
                    </div>
                    <p className="loc-p">{e.location}</p>
                  </div>
                  <div className="loc-bg">
                    <div className="i-bg">
                      <BsBriefcaseFill className="loc-icon" />
                    </div>
                    <p className="loc-p">{e.employmentType}</p>
                  </div>
                </div>
                <p className="pak-p">{e.packagePerAnnum}</p>
              </div>
              <div className="hr-bg">
                <hr />
              </div>
              <div className="des-bg">
                <h1 className="pak-p">Description</h1>
                <p className="des-p">{e.jobDescription}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderRoleFailure = () => {}

  renderRoles() {
    const {apiState2} = this.state
    switch (apiState2) {
      case apiStatus2.success:
        return this.renderRoleSuccess()
      case apiStatus2.failure:
        return this.renderRoleFailure()
      case apiStatus2.progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {activeSalaryId, activeEmpId, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="job-bg">
          <div className="applicant-bg">
            {this.renderProfileList()}
            <EmploymentSalaryRanges
              checkFun={this.checkFun}
              activeSalaryId={activeSalaryId}
              setEmpId={this.setEmpId}
              activeEmpId={activeEmpId}
            />
          </div>

          <div className="roles-search-bg">
            <div className="search-bg">
              <input
                type="search"
                className="searchInp"
                value={searchInput}
                placeholder="Search"
                onChange={this.searchBtn}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="icon-bg"
                onClick={this.getDet}
              >
                {' '}
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderRoles()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
