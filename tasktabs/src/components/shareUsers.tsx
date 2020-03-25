import * as React from 'react';
import styled from 'styled-components';

const SharedWithTab = styled.div`
    display: flex;
    flex-direction: row;
    border: solid 2px black;
    border-top: none;
    width: 100%;
`;

const UserText = styled.div`
    font-size: 32px;
`;

const OwnerBox = styled.div`
    border-right: solid 1px black;
    display: flex;
    flex-direction: column;
    padding: 5px;
    width: 80px;
`;

const SharedUserBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin-left: 10px;
`;

const LabelText = styled.label`
    font-size: 24px;
    margin-right: 11px;
`;

const ButtonText = styled.div`
    font-size: 32px;
`;

const AddUserButton = styled.button`
    border-radius: 100%;
    width: 50px;
    height: 50px;
`;

interface User {
    id: number;
    name: string;
}

interface ShareUserProps {
    owner: User;
    sharedUsers: User[];
}

export class ShareUsers extends React.Component<ShareUserProps> {
    owner: User;
    sharedUsers: User[];

    constructor(props: ShareUserProps) {
        super(props);
        this.owner = props.owner;
        this.sharedUsers = props.sharedUsers;
    }

    render() {
        const sharedArray = this.sharedUsers.map((item) => {
            return (
                <SharedUserBox key={item.id}> <UserText> {item.name} </UserText> </SharedUserBox>
            )
        });

        return (
                <SharedWithTab>
                    <OwnerBox>
                        <LabelText> Owner </LabelText>
                        <UserText> {this.owner.name} </UserText>
                    </OwnerBox>
                    <SharedUserBox>
                        <LabelText> Shared With </LabelText>
                    </SharedUserBox>
                    {sharedArray}
                    <AddUserButton>
                        <ButtonText> + </ButtonText>
                    </AddUserButton>
                </SharedWithTab>
        )
    }
}
