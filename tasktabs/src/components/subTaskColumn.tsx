import * as React from 'react';
import styled from 'styled-components';

import { SubTaskButton } from './subTaskButton';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 5px 5px 5px 0px;
  border-style: solid;
`;

const NewTaskButton = styled.button`
    height: 100px;
    width: 400px;
    :hover {
        cursor: pointer;
    }
`;

interface SubTask {
    name: string;
    percentage: number;
    id: number;
}

interface SubTaskColumnProps {
    subtasks: SubTask[];
}

// This creates the entire right-hand column of project page. It handles the button that creates a new task,
// and hands down a single element of a subtask array to create subtask buttons one by one.
export class SubTaskColumn extends React.Component<SubTaskColumnProps>{

    constructor(props: SubTaskColumnProps) {
        super(props);
    }

    render() {
        return (
            <Column>
                <NewTaskButton>+ New Task</NewTaskButton>
                {this.props.subtasks.map((task) => {
                    return <SubTaskButton name={task.name} percentage={task.percentage} key={task.id}></SubTaskButton>;
                })}
            </Column>
        );
    }
};