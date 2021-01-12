import React from 'react';
import classes from './ProfileInfo.module.css';



type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return <div>
        <div className={classes.profile_data_item}><b> {contactTitle}</b>: <span>{contactValue}</span></div>
    </div>
}

