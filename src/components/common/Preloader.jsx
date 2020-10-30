import React from 'react';
import preloaderImg from '../../images/preloader.gif';
import classes from '../Friends/Friends.module.css';

const Preloader = (props) => {
    return <div className={classes.preloader}>
        <img src={preloaderImg} alt="preloader" />
    </div>

    
}



export default Preloader;