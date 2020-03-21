import * as React from 'react';
import styled from 'styled-components';

import { SubTaskButton } from './subTaskButton';
import { ProjectButton } from './newProjectButton';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 5px 5px 0px 5px;
  border-style: solid;
  width: 400px;
  height: ${window.innerHeight}px;
`;

interface SubTask {
    name: string;
    percentage: number;
    id: number;
}

interface ProjectColumnProps {
    subtasks: SubTask[];
}

export class ProjectColumn extends React.Component<ProjectColumnProps> {

    constructor(props: ProjectColumnProps) {
        super(props);
    }

    render() {
        return (
            <>
                <Column>
                    <ProjectButton />
                    {this.props.subtasks.map((task) => {
                        return <SubTaskButton name={task.name} percentage={task.percentage} key={task.id}></SubTaskButton>;
                    })}
                </Column>
            </>
        );
    }
}