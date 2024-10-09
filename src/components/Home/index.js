import {Component} from 'react'
import {Link} from 'react-router-dom'
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

class Home extends Component {
  state = {
    techList: [],
    loading: status.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    this.setState({
      loading: status.isLoading,
    })

    try {
      const response = await fetch(url)

      // If the response status is not ok, throw an error to catch
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()
      const {courses} = data
      this.setState({
        techList: courses,
        loading: status.success,
      })
    } catch (error) {
      this.setState({
        loading: status.failure,
      })
    }
  }

  renderView = () => {
    const {techList, loading} = this.state

    switch (loading) {
      case status.isLoading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color="#4656a1"
              height={50}
              width={50}
              data-testid="loader"
            />
          </div>
        )
      case status.success:
        return (
          <>
            <h1 className="main-heading">Courses</h1>
            <ul className="list-conainer">
              {techList.map(eachItem => (
                <Link
                  to={`/courses/${eachItem.id}`}
                  className="link-style"
                  key={eachItem.id}
                >
                  <li className="course-list">
                    <img
                      src={eachItem.logo_url}
                      alt={eachItem.name}
                      className="course-image"
                    />
                    <p className="course-name">{eachItem.name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </>
        )
      case status.failure:
        return <Failure onRetry={this.onRetry} />
      default:
        return null
    }
  }

  onRetry = () => {
    this.getData()
  }

  render() {
    return <div className="home-container">{this.renderView()}</div>
  }
}

export default Home
