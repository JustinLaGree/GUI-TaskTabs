import * as React from 'react';
import styled from 'styled-components';

const ProjectButtonBox = styled.button`
    height: 100px;
    width: 400px;
    :hover {
        cursor: pointer;
    }
`;

const ButtonText = styled.div`
    color: black;
    font-size: 16px;
`;

export class ProjectButton extends React.Component<{}>{

    render() {
        return (
            <>
                <ProjectButtonBox>
                    <ButtonText>
                        + New Project
                    </ButtonText>
                </ProjectButtonBox>
            </>
        );
    }
};
