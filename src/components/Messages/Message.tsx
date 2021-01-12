import React from 'react';
import classes from './Messages.module.css';
import UserImg from '../../images/sideBar/user.svg';



type PropsType = {
    message: string
}

export const Message: React.FC<PropsType> = ({message}) => {
    return (
        <div className={classes.item}><img src={UserImg} alt="" />{message}</div>
    );
}

