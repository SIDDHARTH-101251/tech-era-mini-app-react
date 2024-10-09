import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Failure from '../Failure'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const status = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: status.initial,
      courseDetails: {},
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}` // Correct URL
    this.setState({
      loading: status.isLoading,
    })
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          loading: status.success,
          courseDetails: data.course_details,
        })
      } else {
        this.setState({
          loading: status.failure,
        })
      }
    } catch (err) {
      this.setState({
        loading: status.failure,
      })
    }
  }

  renderCourseDetails = () => {
    const {courseDetails, loading} = this.state
    const updatedCourseDetails = {
      id: courseDetails?.id || '',
      name: courseDetails?.name || 'Unknown Course',
      imageUrl:
        courseDetails?.image_url ||
        courseDetails?.imageUrl ||
        'default-image-url.png', // Handle both image_url and imageUrl
      description: courseDetails?.description || 'No description available',
    }

    const {name, imageUrl, description} = updatedCourseDetails

    switch (loading) {
      case status.isLoading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
          </div>
        )
      case status.success:
        return (
          <div className="course-details-card-container">
            <div className="course-details-card">
              <div className="image-card">
                <img
                  src={imageUrl}
                  alt={name}
                  className="course-image-details"
                />
              </div>
              <div className="description-card">
                <h1 className="course-name-details-section">{name}</h1>
                <p className="course-description">{description}</p>
              </div>
            </div>
          </div>
        )
      case status.failure:
        return <Failure onRetry={this.onRetryCourseDetails} />
      default:
        return null
    }
  }

  onRetryCourseDetails = () => {
    this.getData()
  }

  render() {
    return this.renderCourseDetails()
  }
}

export default Course
