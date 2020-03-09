
import * as React from 'react';
import styled from 'styled-components';

import { ProjectButton } from './newProjectButton';
import { TaskView } from './taskView';

const BlueSideBar = styled.div`
  background-color: cornflowerblue;
  width: 300px;
  height: ${window.innerHeight}px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
`;

export class ProjectPage extends React.Component<{}>{

  render() {
    return (
      <Container>
        <BlueSideBar>
          <Column>
            <ProjectButton />
          </Column>
        </BlueSideBar>
        <TaskView name="Project With a Very Long Name" completion={10} description="test" />
      </Container>
    );
  }
};
