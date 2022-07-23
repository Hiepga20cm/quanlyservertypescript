import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
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
import authApi from './api/authApi';

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
      <nav>
        <div id='header'>
          <ul id="nav">
            <li><Link to='/home'>Trang chủ</Link></li>
            <li><Link to='/createServer'>Thêm Server</Link></li>
            <li><Link to='/server/storedServer'>Server của tôi</Link></li>
            <li><Link to='/user'>Quản lý người dùng</Link></li>
            <li onClick={authApi.logout} style={{color:'white'}}>Đăng xuất</li>
          </ul>
        </div>
      </nav>
      <Routes>

        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={token ? <RegisterForm /> : <LoginForm />} />
        <Route path='/home' element={token ? <Home /> : <LoginForm />} />
        <Route path='/createServer' element={check ? <CreateServer /> : <LoginForm />} />
        <Route path='/server/storedServer' element={token ? <StoredServer /> : <LoginForm />} />
        <Route path='/server/:id/edit' element={check ? <EditServer /> : <LoginForm />} />
        <Route path='/me/trash/server' element={check ? <TrashServer /> : <Home />} />
        <Route path='/user' element={check ? <ListUser /> : <StoredServer />} />
        <Route path='/user/:id/update' element={check ?<UpdateUser /> : <Home/> } />

      </Routes>
    </BrowserRouter>)
}

export default App;
