import * as React from 'react';
import styled from 'styled-components';

const ProjectButtonBox = styled.button`
    width: 280px;
    height: 50px;
    background-color: purple;
`;

const ButtonText = styled.div`
    color: black;
    font-size: 16px;
`;

export interface ProjButtonProps {  };

export class ProjectButton extends React.Component<ProjButtonProps, {}>{

    render() {
        return (
          <>
            <ProjectButtonBox>
                <ButtonText>
                    Create Project +
                </ButtonText>
            </ProjectButtonBox>
          </>
        );
    }
};
