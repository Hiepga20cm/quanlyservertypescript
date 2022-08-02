import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import userApi from '../../api/userApi';
import NavBar from '../layout/NavBar';


const UpdateUser = () => {
    const [userName, setUserName] = useState('');
    const [permission, setPermission] = useState('');
    const [passWord, setPassWord] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { id } = useParams();

    const user = userApi.updateUser(id);
    console.log(user);

    async function updateUser(e) {
        e.preventDefault();

        await userApi.updateUser({

            userName: userName,
            permission: permission,
            passWord: passWord,
            firstName: firstName,
            lastName: lastName,

        }, id)

    }
    return (

        <motion.div initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}>
            <NavBar />
            <div className="create-page">
                <div className="form">
                    <form className="create-form" onSubmit={updateUser}>

                        <input type="text" placeholder="Tên User" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input type="passWord" placeholder="Mật khẩu" value={passWord} onChange={(e) => setPassWord(e.target.value)} />
                        <input type="text" placeholder='Chức vụ' value={permission} onChange={(e) => setPermission(e.target.value)} />
                        <input type="text" placeholder="Tên đầu" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Tên cuối" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                        <button type="onSubmit" value={'create'}> Gửi </button>
                    </form>
                </div>
            </div>
        </motion.div>

    )
}

export default UpdateUser;
