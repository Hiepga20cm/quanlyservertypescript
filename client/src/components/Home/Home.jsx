//import React from 'react';
//import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import serverApi from '../../api/serverApi';
import "./Home.css"
import { motion } from 'framer-motion';

const Home = () => {
  const [server, setServers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const data = await serverApi.storedServer();
        if(data){
          setServers(data);
        }else{
          alert('Vui dòng đăng nhập lại');
        }
       

      } catch (err) {
        console.log(err)
      }

    }
    fetchData();
  }, [])

  return (

    <motion.div  initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }} className='home-container' >
      {
        server.map(serv => (
          <div className='card' style={{ width: '30%', float: 'left', marginTop: '10%' }}>
            <img className='card-img-top' width={100} src='https://freepngimg.com/thumb/server/36301-1-server-hd.png' alt= {serv.id} />
            <li key={serv.id}>{serv.name}</li>
          </div>
        ))
      }
    </motion.div >
  )
}

export default Home
