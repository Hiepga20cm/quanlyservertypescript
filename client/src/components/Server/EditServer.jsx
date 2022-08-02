import React from 'react'
import { useState } from 'react';
import serverApi from '../../api/serverApi';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../layout/NavBar';


const EditServer = () => {
    const [name, setName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [status, setStatus] = useState(false);
    const [ram, setRam] = useState('');
    const [disk, setDisk] = useState('');
    const { id } = useParams();

    const server = serverApi.edit(id);
    console.log(server);

    const statuss = [
        {
            label: "On",
            value: "true",
        },
        {
            label: "Off",
            value: "false",
        },
    ];

    async function editServer(e) {
        e.preventDefault();

        await serverApi.editServer({

            name: name,
            passWord: passWord,
            status: status,
            ram: ram,
            disk: disk
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
                    <form className="create-form" onSubmit={editServer}>
                        <label></label>

                        <input type="text" placeholder="Tên Server" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="passWord" placeholder="Mật Khẩu" value={passWord} onChange={(e) => setPassWord(e.target.value)} />
                        <label >Trạng thái :</label>
                        <select placeholder="Trạng thái" onChange={(e) => {
                            const selectStatus = e.target.value;
                            console.log(selectStatus);
                            setStatus(selectStatus);
                        }}>
                            {statuss.map((statuss) => (
                                <option value={statuss.value}>{statuss.label}</option>
                            ))}
                        </select>
                        <input type="text" placeholder="Ram" value={ram} onChange={(e) => setRam(e.target.value)} />
                        <input type="text" placeholder="Disk" value={disk} onChange={(e) => setDisk(e.target.value)} />

                        <button type="onSubmit" value={'create'}> Gửi </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default EditServer