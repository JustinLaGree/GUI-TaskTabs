import * as React from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
    height: 130px;
    width: 600px;
    border-radius: 15px;
    border: 1px solid #333;
    position: relative;
    margin: auto;
`;

const SubTaskProgressBar = styled.div`
    height: 105px;
    width: 395px;
    position: relative;
    margin: auto;
`;

interface FillingProps {
    percentage: string;
    color: string;
};

const ProgressBarFilling = styled.div`
    background: ${(props: FillingProps) => props.color};
    height: 100%;
    border-radius: inherit;
    width: ${(props: FillingProps) => props.percentage}%;
    z-index: 0;
`;

const PercentageText = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 24px;
    z-index: 10;
`;

interface ProgressBarProps {
    percentage: number;
    isTaskButton?: boolean;
};

// ProgressBar takes in the percentage completion as a number and renders the
// progressbar. 
export class TaskProgressBar extends React.Component<ProgressBarProps> {
    constructor(props: ProgressBarProps) {
        super(props);
    }

    // Currently hardcoded colors, number ranges are up to debate.
    determineColor = () => {
        const percentage = this.props.percentage;
        let color = 'green';
        if (percentage < 25) {
            color = 'red';
        } else if (percentage < 70) {
            color = 'orange';
        }
        return color;
    }

    render() {
        const color = this.determineColor();

        if (this.props.isTaskButton) {
            return (
                <SubTaskProgressBar>
                    <ProgressBarFilling percentage={this.props.percentage.toString()} color={color} />
                    <PercentageText>{this.props.percentage}%</PercentageText>
                </SubTaskProgressBar>
            )

        } else {
            return (
                <ProgressBar>
                    <ProgressBarFilling percentage={this.props.percentage.toString()} color={color} />
                    <PercentageText>{this.props.percentage}%</PercentageText>
                </ProgressBar>
            )
        }
    }
}
