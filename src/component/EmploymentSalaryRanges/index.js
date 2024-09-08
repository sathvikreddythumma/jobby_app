import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const EmploymentSalaryRanges = props => {
  const {item} = props
  return (
    <>
      <div className="hr">
        <hr />
      </div>
      <ul className="ul-bg">
        <p className="type-emp">Type of Employment</p>
        {employmentTypesList.map(e => {
          const {activeEmpId, setEmpId} = props

          const ec = () => {
            setEmpId(e.employmentTypeId)
          }
          return (
            <li className="list-bg" key={e.employmentTypeId}>
              <input type="checkbox" className="box" onClick={ec} />
              <p className="li-p">{e.label}</p>
            </li>
          )
        })}
      </ul>
      <div className="hr">
        <hr />
      </div>
      <ul className="ul-bg">
        <p className="type-emp">Salary Range</p>
        {salaryRangesList.map(e => {
          const {activeSalaryId, checkFun} = props

          const rc = () => {
            checkFun(e.salaryRangeId)
          }

          return (
            <li className="list-bg" key={e.salaryRangeId}>
              <input type="checkbox" className="box" onClick={rc} />
              <p className="li-p">{e.label}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
export default EmploymentSalaryRanges
