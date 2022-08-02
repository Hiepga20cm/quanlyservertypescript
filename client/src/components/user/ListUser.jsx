import React from 'react'
import { useState } from 'react'
import userApi from '../../api/userApi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../layout/NavBar';
import { Button } from '../layout/Style';
import { FaArrowCircleUp } from 'react-icons/fa';

const ListUser = () => {
    const [user, setUsers] = useState([]);
    const [userName, setUserName] = useState([]);
    let stt = 1;
    const [showGototop, setShowGototop] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userApi.getUsers();
                if (data) {
                    setUsers(data);
                } else {
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
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const res = await userApi.searchUser(userName)
            setUsers(res);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <motion.div initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}>
            <NavBar />
            <h3 style={{marginTop:'90px'}}>DANH SÁCH NGƯỜI DÙNG</h3>
            <Link to="/register"> Thêm người dùng</Link>

            <div class="box">
                <form name="search" onSubmit={handleSearch}>
                    <input type="text" class="inputsearch" placeholder='Nhập tên Server' value={userName} onmouseout="this.value = ''; this.blur();" onChange={(e) => setUserName(e.target.value)} />
                </form>
            </div>

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
                <Button>
                    <FaArrowCircleUp onClick={scrollToTop} style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20,
                    }} />
                </Button>
            )}
        </motion.div>
    );
}

export default ListUser;