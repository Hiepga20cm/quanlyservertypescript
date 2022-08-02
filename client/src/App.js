import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/layout/Landing';

import LoginForm from './components/auth/Login/LoginForm';
import RegisterForm from './components/auth/Register/RegisterForm';
import Home from './components/Home/Home';
import CreateServer from './components/Server/CreateServer';
import StoredServer from './components/Server/StoredServer';
import EditServer from './components/Server/EditServer';
import TrashServer from './components/Server/TrashServer';
import ListUser from './components/user/ListUser';
import UpdateUser from './components/user/UpdateUser';

function App() {
  const token = localStorage.getItem('token');
  const permission = localStorage.getItem('permission');
  let check = false;
  if (permission === 'admin'){
    check = true;
  }
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={!token ? <LoginForm /> : <Home/>} />
        <Route path='/register' element={token ? <RegisterForm /> : <LoginForm />} />
        <Route path='/home' element={token ? <Home /> : <LoginForm />} />
        <Route path='/createServer' element={check ? <CreateServer /> : <Home />} />
        <Route path='/server/storedServer' element={token ? <StoredServer /> : <LoginForm />} />
        <Route path='/server/:id/edit' element={check ? <EditServer /> : <LoginForm />} />
        <Route path='/me/trash/server' element={check ? <TrashServer /> : <Home />} />
        <Route path='/user' element={(check&&token) ? <ListUser /> : <StoredServer />} />
        <Route path='/user/:id/update' element={check ?<UpdateUser /> : <Home/> } />

      </Routes>
    </BrowserRouter>)
}

export default App;
