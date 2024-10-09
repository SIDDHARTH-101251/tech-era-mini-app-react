import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Course from './components/Course'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/courses/:id" component={Course} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
