import {Route,Routes,BrowserRouter} from 'react-router-dom'
import {routes} from './Routes'
export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        {
          routes.map(({path,component}, index) => <Route key={index.toString()} path={path} element={component}/>)
        }
      </Routes>
    </BrowserRouter>
  )
}

