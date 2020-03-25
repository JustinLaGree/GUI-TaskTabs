import * as React from 'react';
import styled from 'styled-components';

import { TaskProgressBar } from './progressBar';
import { SubTask } from './subtaskType';

// With the percentage bars there, it might not be apparent that they are buttons.
// With a hover state, we can make that clear by changing the mouse pointer to the pointer hand.
const TaskButton = styled.button`
    height: 110px;
    width: 400px;
    padding: 0px;
    position: relative;
    :hover {
        cursor: pointer;
    }
`;

const SubTaskName = styled.div`
    font-size: 32px;
    position: absolute;
    z-index: 99;
    top: 30px;
    left: 30px;
`;

interface SubTaskButtonProps {
    percentage: number;
    name: string;
    taskHead: SubTask;
    changeHead: (newHead: SubTask) => any;
}

// This is a single SubTask button. They live in the right hand side of the project page.
// This reuses the progress bar for the background of the button.
export class SubTaskButton extends React.Component<SubTaskButtonProps>{
    name: string;
    displayedName: string;

    constructor(props: SubTaskButtonProps) {
        super(props);

        this.name = this.props.name;
        this.displayedName = this.name;
    }

    // If the title is too long, we should shorten it to fit the space we have.
    checkNameLength = () => {
        if (this.name.length > 16) {
            this.displayedName = this.name.substring(0, 15);
            this.displayedName += "...";
        }
    }

    onButtonClick = () => {
        this.props.changeHead(this.props.taskHead);
    }

    render() {
        this.checkNameLength();
        return (
            <TaskButton onClick={this.onButtonClick}>
                <SubTaskName>{this.displayedName}</SubTaskName>
                <TaskProgressBar percentage={this.props.percentage} isTaskButton={true}></TaskProgressBar>
            </TaskButton>
        );
    }
};
