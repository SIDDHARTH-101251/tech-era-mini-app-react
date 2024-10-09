import './index.css'

const Failure = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="oops-heading">Oops! Something Went Wrong</h1>
      <p className="oops-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}

export default Failure
