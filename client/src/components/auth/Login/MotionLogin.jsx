import React from 'react';
import { motion } from 'framer-motion';

const animotion = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },

}

const MotionLogin = ({ childent }) => {
    return (
        <motion.div variants={animotion} initial='initial' 
        animate='animate' 
        exit='exit' 
        transition={{ duration: 1 }}
        >
            {childent}
        </motion.div>
    );
};

export default MotionLogin;
