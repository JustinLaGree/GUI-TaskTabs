import * as React from 'react';
import styled from 'styled-components';

import { TaskProgressBar } from './progressBar';
import { StatusDropdown } from './StatusDropdown';

const Container = styled.div`
    width: 932px;
    border-width: 5px;
    border-style: solid;
    padding: 50px;
`;

const Title = styled.div`
    font-size: 72px;
    margin-left: 50px;
    margin-top: 10px;
`;

const SaveButton = styled.button`
    width: 177px;
    height: 100px;
`;

const SaveButtonText = styled.div`
    font-size: 32px;
    margin: 30px;
`;

// The delete button is absolutely positioned to the right because the length of the
// title could influence the button's position.
const DeleteButton = styled.button`
    width: 177px;
    height: 40px;
    position: absolute;
    top: 60px;
    right: 30px;
`;

const DeleteButtonText = styled.div`
    font-size: 32px;
`;

const LabelText = styled.div`
    font-size: 32px;
    text-align: center;
`;

const CalendarButton = styled.button`
    width: 180px;
    height: 50px;
    margin: 5px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
`;

interface Options {
    value: string;
    label: string;
}

interface TaskViewProps {
    name: string;
    completion: number;
    description: string;
    dueDate: Date;
    startDate: Date;
    status: string;
};

// TaskView is intended to be the center view for all tasks, substasks and project heads.
export class TaskView extends React.Component<TaskViewProps>{
    name: string;
    displayedName: string;
    displayedDueDate: string;
    today: Date;
    daysLeft: number;
    displayedStartDate: string;
    status: string;
    statusOptions: Array<Options>;

    constructor(props: TaskViewProps) {
        super(props);

        this.name = props.name;
        this.displayedName = this.name;

        this.today = new Date();
        this.daysLeft = 0;
        this.displayedDueDate = "1/1/1900";
        this.displayedStartDate = "1/1/1900";

        this.status = props.status;
        this.statusOptions = [
            { value: 'active', label: 'Active'},
            { value: 'inactive', label: 'Inactive'},
            { value: 'complete', label: 'Complete'},
        ];
    }

    // If the title is too long, we should shorten it to fit the space we have.
    checkNameLength = () => {
        if (this.name.length > 16) {
            this.displayedName = this.name.substring(0, 15);
            this.displayedName += "...";
        }
    }

    //Calculates the difference between the current date and the due date
    calculateDaysLeft = () => {
        if(this.today != this.props.dueDate) {
            const dueMonth = this.props.dueDate.getMonth() + 1;
            const dueYear = this.props.dueDate.getFullYear();
            const dueDay = this.props.dueDate.getDate();
            const todayMonth = this.today.getMonth() + 1;
            const todayYear = this.today.getFullYear();
            const todayDay = this.today.getDate();
            const divide = 1000 * 60 * 60 * 24;

            this.daysLeft = Math.floor((Date.UTC(dueYear, dueMonth, dueDay) - Date.UTC(todayYear, todayMonth, todayDay)) / divide);
        }
    }

    //Takes the due date and turns it into a string
    dueDateString = () => {
        const dueMonth = this.props.dueDate.getMonth() + 1;
        const dueYear = this.props.dueDate.getFullYear();
        const dueDay = this.props.dueDate.getDate();

        this.displayedDueDate = dueMonth + "/" + dueDay + "/" + dueYear;

    }

    //Takes the start date and turns it into a string
    startDateString = () => {
        const month = this.props.startDate.getMonth() + 1;
        const year = this.props.startDate.getFullYear();
        const day = this.props.startDate.getDate();

        this.displayedStartDate = month + "/" + day + "/" + year;
    }

    render() {
        this.checkNameLength();
        this.calculateDaysLeft();
        this.dueDateString();
        this.startDateString();
        return (
            <Container>
                <Row>
                    <SaveButton>
                        <SaveButtonText>Save</SaveButtonText>
                    </SaveButton>
                    <Title>{this.displayedName}</Title>
                    <DeleteButton>
                        <DeleteButtonText>Delete</DeleteButtonText>
                    </DeleteButton>
                </Row>
                <TaskProgressBar percentage={this.props.completion} />
                <LabelText>Date Due:
                    <CalendarButton>
                        <LabelText>{this.displayedDueDate}</LabelText>
                    </CalendarButton>
                </LabelText>
                <LabelText> {this.daysLeft} Days Left! </LabelText>
                <StatusDropdown taskStatus = {this.status} val = {this.statusOptions}/>
                <LabelText> Date Started: {this.displayedStartDate} </LabelText>
                <LabelText> Average Time Per Task: N/A Days </LabelText>
            </Container>
        );
    }
};
