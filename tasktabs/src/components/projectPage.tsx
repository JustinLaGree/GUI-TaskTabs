
import * as React from 'react';
import styled from 'styled-components';

import { ProjectColumn } from './projectColumn';
import { TaskView } from './taskView';
import { SubTaskColumn } from './subTaskColumn';

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
`;

interface SubTask {
  name: string;
  percentage: number;
  id: number;
}

interface User {
    id: string;
    name: string;
    idKey: number;
}

interface Tag {
    tag: string;
    id: number;
}

const testSubTaskData: SubTask[] = [
  { name: "Task 1", percentage: 12, id: 0 },
  { name: "Task 2", percentage: 0, id: 1 },
  { name: "Task 3", percentage: 100, id: 2 },
  { name: "Task 4", percentage: 50, id: 3 },
  { name: "Task 5", percentage: 81, id: 4 },
  { name: "Loooooong task name", percentage: 30.7, id: 5 },
];

const testProjectData: SubTask[] = [
  { name: "Project 1", percentage: 20, id: 0 },
  { name: "Project 2", percentage: 63, id: 1 },
  { name: "Project 3", percentage: 52, id: 2 },
  { name: "Project 4", percentage: 17, id: 3 },
  { name: "Project 5", percentage: 86, id: 4 },
  { name: "Loooooong Project name", percentage: 100, id: 5 },
];

const testTaskTags: Tag[] = [
    {tag: "Tag1", id: 0},
    {tag: "Tag2", id: 1},
    {tag: "Tag3", id: 2},
];

const testOwner = {id: "ownerID", name: "User1", idKey: 0};

const testSharedWith: User[] = [
    { id: 'shared1ID', name: 'User2', idKey: 1},
    { id: 'shared2ID', name: 'User3', idKey: 2},
];

// ProjectPage contains the entire application past the Google oauth. This should include the left and right sidebars
// task view, settings user info, etc.
export class ProjectPage extends React.Component<{}>{

  render() {
    return (
      <Container>
        <ProjectColumn subtasks={testProjectData}/>
        <TaskView name="Project With a Very Long Name" completion={10} description="test" dueDate={new Date(2020, 2, 24)} startDate={new Date(2020,2,14)} status="active" assignedTo="User1" tags={testTaskTags} owner={testOwner} sharedUsers={testSharedWith}/>
        <SubTaskColumn subtasks={testSubTaskData}></SubTaskColumn>
      </Container>
    );
  }
};
