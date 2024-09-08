import './index.css'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentSalaryRanges from '../EmploymentSalaryRanges'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiState: apiStatus.initial,
    proDetList: {},
    rolesList: {},
    activeSalaryId: '',
    activeEmpId: '',
    empType: '',
    pak: '',
    searchInput: '',
    ee: [],
  }

  componentDidMount() {
    this.profileDetails()
    this.roleDetails()
  }

  roleDetails = async () => {
    const {empType, pak, searchInput, activeSalaryId, activeEmpId} = this.state
    this.setState({apiState: apiStatus.progress})
    const roleUrl = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${activeSalaryId}&search=`
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
    }
  }

  rolesSuccess = nRl => {
    this.setState({apiState: apiStatus.success, rolesList: nRl})
  }

  profileDetails = async () => {
    this.setState({apiState: apiStatus.progress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const t = Cookies.get('jwt_token')
    const proOptions = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${t}`,
      },
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
    this.setState({apiState: apiStatus.failure})
  }

  profileSuccess = proDet => {
    this.setState({apiState: apiStatus.success, proDetList: proDet})
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
    const {empType, ee} = this.state
    ee.push(empId)
    const con = `${empId},`
    const newEmp = empType + con
    const n = ee.join(',')
    this.setState({activeEmpId: empId, empType: n}, this.roleDetails)
  }

  checkFun = sId => {
    this.setState({activeSalaryId: sId}, this.roleDetails)
  }

  renderProfileList() {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatus.success:
        return this.renderProfile()
      case apiStatus.failure:
        return this.renderProfileFailure()
      case apiStatus.progress:
        return this.renderLoader()

      default:
        return null
    }
  }

  renderRoleSuccess = () => {
    const {rolesList} = this.state
    return (
      <ul className="roles-ul-bg">
        <li className="role-li-bg">
          <div className="role-head-bg">
            <img
              src={rolesList[0].companyLogoUrl}
              alt="company logo"
              className="com-img"
            />

            <div className="head-bg">
              <div className="heading-bg">
                <h1 className="role-heading">{rolesList[0].title}</h1>
              </div>
              <div className="star-bg">
                <FaStar className="star-icon" />
                <p className="rev-p">{rolesList[0].rating}</p>
              </div>
            </div>
          </div>

          <div className="loc-sal-bg">
            <div className="loc-bg">hi</div>
          </div>
        </li>
      </ul>
    )
  }

  renderRoles() {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatus.success:
        return this.renderRoleSuccess()
      case apiStatus.failure:
        return this.renderRoleFailure()
      case apiStatus.progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {proDetList, activeSalaryId, activeEmpId, rolesList} = this.state

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
              <input type="search" className="searchInp" placeholder="Search" />

              <button
                type="button"
                data-testid="searchButton"
                className="icon-bg"
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
