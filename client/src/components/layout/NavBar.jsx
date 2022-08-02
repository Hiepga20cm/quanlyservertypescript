import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import authApi from '../../api/authApi';
import { useState } from 'react';
const NavBar = () => {
  const permission = localStorage.getItem('permission');
  const [userCrl, setUserCtl] = useState(false);

  useEffect(() => {
    try {
      if (permission === 'admin') {
        setUserCtl(true);
      }
    } catch (error) {

    }
  },[permission])
  return (
    <nav>
      <div id='header'>
        <ul id="nav">
          <li><Link to='/home'>Trang chủ</Link></li>
          <li><Link to='/createServer'>Thêm Server</Link></li>
          <li><Link to='/server/storedServer'>Server của tôi</Link></li>
          {userCrl && (
            <li><Link to='/user'>Quản lý người dùng</Link></li>
          )}
        </ul>
        <button id='logoutbtn' onClick={authApi.logout } style={{ float:'right'}}>Đăng xuất</button>
      </div>
    </nav>
  )
}

export default NavBar
