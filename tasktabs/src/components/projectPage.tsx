  
import * as React from 'react';
import styled from 'styled-components';

const BlueSideBar = styled.div`
  background-color: cornflowerblue;
  width: 300px;
  height: ${window.innerHeight}px;
  position: absolute;
  top: 0px;
  left: 0px;
`;

export interface ProjectProps {  };

export class ProjectPage extends React.Component<ProjectProps, {}>{

    render() {
        console.log(window.innerHeight);
        return (
          <>
            <BlueSideBar />
          </>
        );
    }
};
