import React from 'react';
import { useState } from 'react';
import userApi from '../../../api/userApi';
import '../Register/Register.css';

const RegisterForm = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [permission, setPermission] = useState('');




    async function registernUser() {
        await userApi.createUser({
            userName,
            passWord,
            firstName,
            lastName,
            permission
        })
    }

    return (
        <div className='login-page'>
            <div className='form'>
                <form className="register-form" onSubmit={registernUser}>

                    <input type="text" placeholder="Tên đăng nhâp" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <input type="passWord" placeholder="Mật khẩu" value={passWord} onChange={(e) => setPassWord(e.target.value)} />
                    <input type="text" placeholder="Họ" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Tên " value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder="Chức vụ" value={permission} onChange={(e) => setPermission(e.target.value)} />

                    <button type="onSubmit" value={'Đăng ký'}> Tạo Tài Khoản</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm
