import * as React from 'react';
import styled from 'styled-components';

const LabelText = styled.label`
    font-size: 32px;
    display: block;
    text-align: center;
`;

interface Options {
    value: string;
    label: string;
}

interface AssignedState {
    assignedStatus: any
}

interface AssignedDropdownProps {
    assignedStatus: string;
    val: Array<Options>;

}

export class AssignedDropdown extends React.Component<AssignedDropdownProps, AssignedState> {
    options: Array<Options>;

    constructor(props: AssignedDropdownProps) {
        super(props);
        this.state = {assignedStatus: props.assignedStatus}
        this.options = props.val;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({assignedStatus: e.target.value});
    }

    render() {
        const assignedStatus = this.state.assignedStatus;

        const arrayOp = this.options.map((item, i) => {
            return (
                <option key={i} value={item.value}>{item.label}</option>
                )
        });

        return(
            <LabelText>Assigned to:
                <select value={assignedStatus} onChange={this.handleChange}>
                    {arrayOp}
                </select>
            </LabelText>
        )
    }
}
