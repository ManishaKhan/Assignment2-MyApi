
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './EmpListing';
import EmpDetail from './EmpDetail';
import EmpEdit from './EmpEdit';


function App() {
  

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/employee/detail/:empid' element={<EmpDetail />}></Route>
          
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
          
        </Routes>
      </BrowserRouter>

    </div>
  );

}

export default App;
