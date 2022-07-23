//import { json } from "body-parser";
//import e from "express";
//import { response } from "express";
import { useState } from "react";
import '../Login/Loginform.css';
import { motion } from 'framer-motion';
import authApi from "../../../api/authApi";

//import authApi from "../../../api/authApi";

const LoginForm = () => {

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');


    async function loginUser(e) {
        e.preventDefault();

        try {
            const res = await authApi.login({
                userName: userName,
                passWord: passWord
            });
            if (res.status === 'ok') {
                localStorage.setItem('token', res.user);
                localStorage.setItem('permission',res.permission);
                window.location.reload();
                alert('dang nhap thanh cong');
            }else{
                alert('dang nhap that bai');
                window.location.reload();
            }

        } catch (error) {
            console.log(error);
        }

    }



    return (
        <motion.div initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}>
            <div className="login-page">
                <div className="form">

                    <form className="login-form" onSubmit={loginUser}>
                        <label>Đăng nhập</label>
                        <input type="text" placeholder="ten dang nhap" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input type="passWord" placeholder="mat khau" value={passWord} onChange={(e) => setPassWord(e.target.value)} />
                        <button type="onSubmit" value={'login'} > Đăng nhập</button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}


export default LoginForm;
