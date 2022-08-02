import { useState } from "react";
import serverApi from "../../api/serverApi";
import '../Server/CreateServer.css';
import { motion } from 'framer-motion';
import NavBar from "../layout/NavBar";
//import'../Home/Home.css'
const CreateServer = () => {
    const [name, setName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [status, setStatus] = useState(false);
    const [ram, setRam] = useState('');
    const [disk, setDisk] = useState('');
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

    async function createServer(e) {
        e.preventDefault();
        try {
            const res = await serverApi.createServer({
                name: name,
                password: passWord,
                status: status,


                
                ram: ram,
                disk: disk
            });
            if (res === 'success') {
                alert('Thêm server thành công');
                window.location.reload();
            } else {
                alert('Thất bại');
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

            <NavBar />
            <div className="create-page">
                <div className="form">
                    <form className="create-form" onSubmit={createServer}>
                        <label>Tạo mới Server</label>
                        <input type="text" placeholder="Tên Server" value={name} required='Name is required' onChange={(e) => setName(e.target.value)} />
                        <input type="passWord" placeholder="Mật Khẩu" required='PassWord is required' value={passWord} onChange={(e) => setPassWord(e.target.value)} />
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
                        <input type="text" placeholder="Ram" value={ram} required onChange={(e) => setRam(e.target.value)} />
                        <input type="text" placeholder="Disk" value={disk} required onChange={(e) => setDisk(e.target.value)} />

                        <button type="onSubmit" value={'create'}  > Tạo </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default CreateServer
