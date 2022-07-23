import React from 'react'
import { useState } from 'react'
import serverApi from '../../api/serverApi';
//import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StoreServer.css';
import { motion } from 'framer-motion';



const StoredServer = () => {

  const [server, setServers] = useState([]);
  const [serverName, setServerName] = useState('');
  const [showGototop, setShowGototop] = useState(false);
  let stt = 1;
  console.log(serverName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // if (serverName === '') {
        const data = await serverApi.storedServer();
        console.log(data);
        setServers(data);
        // } else {
        //   const data1 = await serverApi.search({
        //     serverName: serverName
        //   })
        //   console.log(data1);
        //   setServers(data1);
        // }

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

  const search = async () => {
    const data1 = await serverApi.search({
      serverName: serverName
    })
    console.log(data1);
    setServers(data1);
  }

  return (
    <motion.div initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}>
      <h3>Server của tôi</h3>
      <Link to="/me/trash/server">Thùng rác</Link>


      <div class="box">
        <form name="search" >
          <input type="text" class="inputsearch" placeholder='Nhập tên Server' value={serverName} onmouseout="this.value = ''; this.blur();" onChange={(e) => setServerName(e.target.value)} />
          <button type='onSubmit' onClick={search} > Tim </button>
        </form>
      </div>


      <table className='container'>
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
                <Link to={`/server/${serv._id}/edit`} class="edit-btn">Sửa</Link>
                <button onClick={() => { serverApi.destroyServer(serv._id); window.location.reload() }}>Xóa</button>
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

export default StoredServer
