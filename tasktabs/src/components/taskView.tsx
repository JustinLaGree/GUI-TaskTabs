import * as React from 'react';
import styled from 'styled-components';

import { TaskProgressBar } from './progressBar';

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
    top: 100px;
    right: 50px;
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
`;

interface TaskViewProps {
    name: string;
    completion: number;
    description: string;
    dueDate: Date;
};

// TaskView is intended to be the center view for all tasks, substasks and project heads.
export class TaskView extends React.Component<TaskViewProps>{
    name: string;
    displayedName: string;
    displayedDueDate: string;
    today: Date;
    daysLeft: number;

    constructor(props: TaskViewProps) {
        super(props);

        this.name = props.name;
        this.displayedName = this.name;

        this.today = new Date();
        this.daysLeft = this.calculateDaysLeft();
        this.displayedDueDate = (this.props.dueDate.getMonth() + 1) +
        "/" + this.props.dueDate.getDay() + "/"
        + this.props.dueDate.getFullYear();
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
            return Math.floor((Date.UTC(this.props.dueDate.getFullYear(), this.props.dueDate.getMonth(), this.props.dueDate.getDate()) - Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()) ) /(1000 * 60 * 60 * 24));
        }
    }

    render() {
        this.checkNameLength();
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
            </Container>
        );
    }
};
