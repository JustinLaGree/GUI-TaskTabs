import * as React from 'react';
import styled from 'styled-components';

const LabelText = styled.label`
    font-size: 32px;
    display: block;
    text-align: center;
    margin: auto;
    margin-right: 10px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    font-size: 32px;
    margin: 5px;
`;

interface Options {
    value: string;
    label: string;
}

//Needed in order to do anything with changing the state
interface StatusState {
    taskStatus: any
}

interface StatusDropdownProps {
    taskStatus: string;
    val: Array<Options>;

}

export class StatusDropdown extends React.Component<StatusDropdownProps, StatusState> {
    options: Array<Options>;

    constructor(props: StatusDropdownProps) {
        super(props);
        this.state = {taskStatus: props.taskStatus}
        this.options = props.val;

        this.handleChange = this.handleChange.bind(this);
    }

    //Handles when the state is changed
    //Currently only changes the status
    // Will need to add warnings and change parent and children states as nessisary
    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({taskStatus: e.target.value});
    }

    render() {
        const taskStatus = this.state.taskStatus;

        //Maps through the array given and sets up the options
        //Needs to be done in the render() function or will not produce the proper output
        const arrayOp = this.options.map((item, i) => {
            return (
                <option key={i} value={item.value}>{item.label}</option>
                )
        });

        return(
            <LabelText>Status:
                <Select value={taskStatus} onChange={this.handleChange}>
                    {arrayOp}
                </Select>
            </LabelText>
        )
    }
}
