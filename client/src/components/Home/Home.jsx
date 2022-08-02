import { useState } from 'react';
import { useEffect } from 'react';
import serverApi from '../../api/serverApi';
import "./Home.css";
import { motion } from 'framer-motion';
import NavBar from '../layout/NavBar';
import { Button } from '../layout/Style';
import { FaArrowCircleUp } from 'react-icons/fa';

import Dialog from "@material-ui/core/Dialog";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button1 from "@material-ui/core/Button";
//import LoadingIcon from '../loading';

const Home = () => {
  const [server, setServers] = useState([]);
  const [showGototop, setShowGototop] = useState(false);
  const [detail, setDetail] = useState(false);
  const [detailServer, setDetailServer] = useState({ ram: '', disk: '', password: '', status: '', createdAt: '', deleted: '' });
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const data = await serverApi.storedServer();
        if (data) {
          setServers(data);
          //setLoading(false);
        } else {
          alert('Vui dòng đăng nhập lại');
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
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


  const open = () => {
    setDetail(true);
  }
  const close = () => {
    setDetail(false)
  }

  const serverDetail = async (id) => {
    console.log('done');
    const data = await serverApi.getDetail(id);
    if (data) {
      console.log(id);
      console.log(data);
      setDetailServer({
        ram: data.ram,
        disk: data.disk,
        password: data.password,
        status: data.status,
        createdAt: data.createdAt,
        deleted: data.deleted
      });
      console.log(detailServer);
    }
    else {
      alert('Lỗi');
    }
  }


  // return loading ? (
  //   <LoadingIcon />
  // ) : (
  return(
    <motion.div initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }} className='home-container' >
      <NavBar />
      {
        server.map(serv => (
          <div className='card'>
            <img className='card-img-top' width={100} src='https://freepngimg.com/thumb/server/36301-1-server-hd.png'
              alt={serv.id} onClick={() => { open(); serverDetail(serv._id) }} />
            <li className='card-img-top' key={serv.id}>{serv.name}</li>
          </div>
        ))
      }
      {detail && (
        <div>
          <Dialog open={open} onClose={close}>
            <DialogTitle>{"Thông tin chi tiết"}</DialogTitle>
            <DialogContent>
              <ul>
                <li>
                  Ram : {detailServer.ram}
                </li>
                <li>
                  Disk : {detailServer.disk}
                </li>
                <li> Pass Word :{detailServer.password}</li>
                <li> Trạng thái :{String(detailServer.status)}</li>
                <li> Thời gian tạo :{detailServer.createdAt}</li>
                <li> Trạng thái xóa:{String(detailServer.deleted)}</li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button1 onClick={close}
                color="primary" autoFocus>
                Close
              </Button1>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {showGototop && (
        <Button>
          <FaArrowCircleUp onClick={scrollToTop} style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
          }} />
        </Button>
      )}
    </motion.div >
  )
}

export default Home
