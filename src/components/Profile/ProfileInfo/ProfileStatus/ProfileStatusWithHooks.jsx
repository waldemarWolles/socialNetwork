import React, { useEffect, useState } from 'react';
import classes from './../ProfileInfo.module.css';


const ProfileStatusWithHooks = (props) => {


    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    let [hover, setHover] = useState(false);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activatedEditMode = () => {
        if (props.authorizedUserId === props.profile.userId) {
            setEditMode(true);
        }

    }

    const deactivatedEditMode = () => {
        setEditMode(false);
        props.updateStatusThunk(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    const handleMouseIn = () => {
        setHover(true);
    }

    const handleMouseOut = () => {
        setHover(false);
    }

    debugger;
    return <div className={classes.status}>

        {!editMode &&
            <div className={classes.status_text}>
                <div >
                    <b>Status: </b>
                    <span 
                        onMouseOver={handleMouseIn}
                        onMouseOut={handleMouseOut}
                        onDoubleClick={activatedEditMode}> {props.status || 'there is no status'}
                    </span>
                </div>
                {hover && props.authorizedUserId === props.profile.userId &&
                    <div className={classes.status_popup}>DoubleClick to change status</div>}
            </div>
        }

        {editMode &&
            <div>
                <b>Status: </b>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivatedEditMode} value={status} />
            </div>
        }

    </div>


}


export default ProfileStatusWithHooks;