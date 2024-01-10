import logo from './logo.svg';
import './App.css';
import { UserPage } from './page';
import { SignUp } from './signup';
import { LoginUser } from './login';
import { Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<UserPage/>}/>
          <Route path='/page' element={<UserPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LoginUser/>}/>
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
