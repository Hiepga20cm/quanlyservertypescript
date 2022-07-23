import React from 'react'
import { useState } from 'react'
import serverApi from '../../api/serverApi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StoreServer.css';
import { motion } from 'framer-motion';

const TrashServer = () => {
    const [server, setServers] = useState([]);
    let stt =1;
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await serverApi.getTrashServer();
                console.log(data);
                setServers(data);


            } catch (err) {
                console.log(err)
            }

        }

        fetchData();

    }, [])

    return (
        <motion.div initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}>
            <h3>Thùng Rác</h3>
            <Link to="/server/storedServer">Danh sách Server</Link>
            <table class="container">
                <thead>
                    <tr>

                        <th scope="col"><h1>ID</h1></th>
                        <th scope="col"><h1>Tên</h1></th>
                        <th scope="col"><h1>Trạng thái</h1></th>
                        <th scope="col"><h1>Ram</h1></th>
                        <th scope="col"><h1>Disk</h1></th>
                        <th scope="col" colSpan="2"><h1>Thời Gian tạo</h1></th>

                    </tr>
                </thead>

                <tbody>
                    {server.map(serv => (
                        <tr>
                            <th key={serv.id}>{stt++}</th>
                            <td key={serv.id}>{serv.name}</td>
                            <td key={serv.id}>{String(serv.status)}</td>
                            <td key={serv.id}>{serv.ram}</td>
                            <td key={serv.id}>{serv.disk}</td>
                            <td key={serv.id}>{serv.createdAt}</td>
                            <td>
                                <button onClick={() => { serverApi.restoreServer(serv._id); window.location.reload() }} className="restore-btn">Khôi phục</button>
                                <button onClick={() => { serverApi.deleteInDatabase(serv._id); window.location.reload() }}>Xóa vĩnh viễn</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
}

export default TrashServer