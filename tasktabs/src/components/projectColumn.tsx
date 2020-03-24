import * as React from 'react';
import styled from 'styled-components';

import { SubTaskButton } from './subTaskButton';
import { ProjectButton } from './newProjectButton';
import { SubTask } from './subtaskType';

interface ColumnProps {
    height: number;
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 5px 5px 0px 5px;
  border-style: solid;
  width: 400px;
  height: ${(props: ColumnProps) => props.height}px;
`;

interface ProjectColumnProps {
    task: SubTask;
    changeHead: (newHead: SubTask) => any;
}

export class ProjectColumn extends React.Component<ProjectColumnProps> {

    constructor(props: ProjectColumnProps) {
        super(props);
        
        this.state = { height: 0 };
    }

    updateDimensions = () => {
        this.setState({ height: window.innerHeight });
        console.log(this.state);
    };

    // When this object is displayed, add an event that check for window resizes.
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    // Remove event when the object is unmounted.
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    // Make sure column doesn't get too small
    checkHeight = () => {
        const height = window.innerHeight;
        return height > 825 ? height : 825;
    }

    render() {

        const height = this.checkHeight();
        return (
            <>
                <Column height={height} >
                    <ProjectButton />
                    <SubTaskButton name={this.props.task.name} percentage={this.props.task.percentage} key={this.props.task.id} changeHead={this.props.changeHead} taskHead={this.props.task}></SubTaskButton>;
                </Column>
            </>
        );
    }
}