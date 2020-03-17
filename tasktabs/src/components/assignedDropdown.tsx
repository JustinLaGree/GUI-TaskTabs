import * as React from 'react';
import styled from 'styled-components';

const LabelText = styled.label`
    font-size: 32px;
    display: block;
    text-align: center;
    margin: auto;
    margin-left: 10px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    font-size: 32px;
    margin: 5px;
`;

interface User {
    id: string;
    name: string;
    idKey: number;
}

//Needed in order to do anything with changing the state
interface AssignedState {
    assignedState: any
}

interface AssignedDropdownProps {
    assignedState: string;
    sharedUsers: User[];
    owner: User;
}

export class AssignedDropdown extends React.Component<AssignedDropdownProps, AssignedState> {
    options: User[];

    constructor(props: AssignedDropdownProps) {
        super(props);
        this.state = {assignedState: props.assignedState};

        this.options = props.sharedUsers;

        this.handleChange = this.handleChange.bind(this);
    }

    //Handles when state is changed
    //Will still need to add functionality of the option
    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({assignedState: e.target.value});
    }

    render() {
        const assignedState = this.state.assignedState;

        //Maps through the array given and sets up the options
        //Needs to be done in the render() function or will not produce the proper output
        const arrayOp = this.options.map((item, i) => {
            return (
                <option key={item.idKey} value={item.id}>{item.name}</option>
                )
        });

        return(
            <LabelText>Assigned to:
                <Select value={assignedState} onChange={this.handleChange}>
                    <option value={this.props.owner.id}>{this.props.owner.name}</option>
                    {arrayOp}
                </Select>
            </LabelText>
        )
    }
}
