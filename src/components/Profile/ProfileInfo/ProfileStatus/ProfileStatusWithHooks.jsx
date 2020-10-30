import React, { useEffect, useState } from 'react';


const ProfileStatus = (props) => {

   
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);


    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activatedEditMode = () => {
        setEditMode(true);
    }

    const deactivatedEditMode = () => {
        setEditMode(false);
        props.updateStatusThunk(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }
   

        return <div>

            {!editMode &&
                <div >
                    <span onDoubleClick={activatedEditMode}>{this.props.status || 'there is no status'}</span>
                </div>
            }

            {editMode &&
                <div>
                    <input  onChange={onStatusChange} autoFocus={true} onBlur={deactivatedEditMode} value={status} />
                </div>
             }



        </div>
  

}


export default ProfileStatus;