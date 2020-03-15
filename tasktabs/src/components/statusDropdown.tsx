import * as React from 'react';
import styled from 'styled-components';

const LabelText = styled.label`
    font-size: 32px;
    display: block;
    text-align: center;
`;

const Select = styled.select`
    font-size: 32px;
    margin: 5px;
`;

interface Options {
    value: string;
    label: string;
}

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

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({taskStatus: e.target.value});
    }

    render() {
        const taskStatus = this.state.taskStatus;

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
