import React from 'react';


type PropsType = {
    status: string

    updateStatusThunk: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activatedEditMode = () => {
            this.setState({
                editMode: true
            });
      
    }

    deactivatedEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatusThunk(this.state.status);
    }

    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return <div>

            {!this.state.editMode &&
                <div >
                    <span onDoubleClick={this.activatedEditMode}>{this.props.status || 'there is no status'}</span>
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivatedEditMode} value={this.state.status} />
                </div>
            }
        </div>
    }
}

export default ProfileStatus;