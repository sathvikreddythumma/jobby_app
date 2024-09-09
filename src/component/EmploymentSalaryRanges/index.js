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
        <h1 className="type-emp">Type of Employment</h1>
        {employmentTypesList.map(e => {
          const {activeEmpId, setEmpId} = props

          const ec = event => {
            setEmpId(e.employmentTypeId)
          }
          return (
            <li className="list-bg1" key={e.employmentTypeId}>
              <input
                type="checkbox"
                id={e.employmentTypeId}
                className="box"
                onClick={ec}
                value={e.employmentTypeId}
              />
              <label htmlFor={e.employmentTypeId} className="li-p">
                {e.label}
              </label>
            </li>
          )
        })}
      </ul>
      <div className="hr">
        <hr />
      </div>
      <ul className="ul-bg">
        <h1 className="type-emp">Salary Range</h1>
        {salaryRangesList.map(e => {
          const {activeSalaryId, checkFun} = props

          const rc = () => {
            checkFun(e.salaryRangeId)
          }

          return (
            <li className="list-bg1" key={e.salaryRangeId}>
              <input
                type="radio"
                id={e.salaryRangeId}
                className="box"
                name="opt"
                onClick={rc}
              />

              <label htmlFor={e.salaryRangeId} className="li-p">
                {e.label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}
export default EmploymentSalaryRanges
