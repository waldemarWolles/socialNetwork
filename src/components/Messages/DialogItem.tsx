import React from 'react';
import classes from './Messages.module.css';
import UserImg from '../../images/sideBar/user.svg';
import { NavLink } from 'react-router-dom';



type PropsType = {
    name: string
    id: number
}


export const DialogItem: React.FC<PropsType> = ({name, id}) => {
    return (
        <div>
            <NavLink to={'/messages/' + id} className={`${classes.item} `} >
                <img src={UserImg} alt="" />{name}</NavLink>
        </div>
    );
}

