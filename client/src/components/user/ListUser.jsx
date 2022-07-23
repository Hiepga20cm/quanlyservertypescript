import React from 'react'
import { useState } from 'react'
import userApi from '../../api/userApi';
//import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import '../Server/StoredServer';
import { motion } from 'framer-motion';

const ListUser = () => {
    const [user, setUsers] = useState([]);
    let stt = 1;
    const [showGototop, setShowGototop] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userApi.getUsers();
                if (data) {
                    setUsers(data);
                }else{
                    alert('Bạn không đủ quyền');
                }

            } catch (err) {
                console.log(err)
            }

        }
        fetchData();
    }, [])


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGototop(true);
            } else {
                setShowGototop(false);
            }
            console.log(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <motion.div initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}>
            <h3>DANH SÁCH NGƯỜI DÙNG</h3>
            <Link to="/register"> Thêm người dùng</Link>
            <table className='container'>
                <thead>
                    <tr>
                        <th scope="col"><h1>ID</h1></th>
                        <th scope="col"><h1>Tên</h1></th>
                        <th scope="col"><h1>Chức vụ</h1></th>
                        <th scope="col"><h1>Tên đầu</h1></th>
                        <th scope="col"><h1>Tên cuối</h1></th>
                        <th scope="col" colSpan="2"><h1>Thời Gian tạo</h1></th>
                    </tr>
                </thead>

                <tbody>
                    {user.map(user1 => (
                        <tr>
                            <th key={user1.id}>{stt++}</th>
                            <td key={user1.id}>{user1.userName}</td>
                            <td key={user1.id}>{user1.permission}</td>
                            <td key={user1.id}>{user1.firstName}</td>
                            <td key={user1.id}>{user1.lastName}</td>
                            <td key={user1.id}>{user1.createdAt}</td>
                            <td>
                                <Link to={`/user/${user1._id}/update`} class="edit-btn">Sửa</Link>
                                <button onClick={() => { userApi.deleteUser(user1._id); window.location.reload() }}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showGototop && (
                <button style={{
                    position: 'fixed',
                    right: 20,
                    botton: 20
                }}>
                    Quay lại đầu trang
                </button>
            )}
        </motion.div>
    );
}

export default ListUser;