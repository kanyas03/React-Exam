import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Addstudent from './pages/Addstudent'
import GetStudents from './pages/Getstudent'


const App=()=> {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Addstudent/>}/>
      <Route path='/getstudent' element={<GetStudents/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App