  
import * as React from 'react';
import styled from 'styled-components';

import { ProjectButton } from './newProjectButton';

const BlueSideBar = styled.div`
  background-color: cornflowerblue;
  width: 300px;
  height: ${window.innerHeight}px;
  position: absolute;
  top: 0px;
  left: 0px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

export interface ProjectProps {  };

export class ProjectPage extends React.Component<ProjectProps, {}>{

    render() {
        console.log(window.innerHeight);
        return (
          <BlueSideBar>
            <Column>
                <ProjectButton />
            </Column>
          </BlueSideBar>
        );
    }
};
