
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
  subtasks: SubTask[];
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

/*
const testSubTaskData: SubTask[] = [
  { name: "Task 1", percentage: 12, id: 0 },
  { name: "Task 2", percentage: 0, id: 1 },
  { name: "Task 3", percentage: 100, id: 2 },
  { name: "Task 4", percentage: 50, id: 3 },
  { name: "Task 5", percentage: 81, id: 4 },
  { name: "Loooooong task name", percentage: 30.7, id: 5 },
];
*/

const testProjectData: SubTask = {
    name: "Project 1", percentage: 20, id: 0, subtasks: [
      { name: "Task 1", percentage: 60, id: 1, subtasks: [
        { name: "SubTask 1", percentage: 0, id: 7, subtasks: [] },
        { name: "SubTask 2", percentage: 100, id: 8, subtasks: [] },
        { name: "SubTask 3", percentage: 100, id: 9, subtasks: [] },
        { name: "SubTask 4", percentage: 100, id: 10, subtasks: [] },
        { name: "SubTask 5", percentage: 0, id: 11, subtasks: [] },
      ] },
      { name: "Task 2", percentage: 0, id: 2, subtasks: [] },
      { name: "Task 3", percentage: 100, id: 3, subtasks: [] },
      { name: "Task 4", percentage: 50, id: 4, subtasks: [] },
      { name: "Task 5", percentage: 81, id: 5, subtasks: [] },
      { name: "Loooooong task name", percentage: 30.7, id: 6, subtasks: [] },
    ]
  };


const testTaskTags: Tag[] = [
  { tag: "Tag1", id: 0 },
  { tag: "Tag2", id: 1 },
  { tag: "Tag3", id: 2 },
];

const testOwner = { id: "ownerID", name: "User1", idKey: 0 };

const testSharedWith: User[] = [
  { id: 'shared1ID', name: 'User2', idKey: 1 },
  { id: 'shared2ID', name: 'User3', idKey: 2 },
];

// ProjectPage contains the entire application past the Google oauth. This should include the left and right sidebars
// task view, settings user info, etc.
export class ProjectPage extends React.Component<{}, {projectData: SubTask}>{

  constructor(props: {}) {
    super(props);

    this.state = {projectData: testProjectData};
  }

  changeHead = (newHead: SubTask) => {
    this.setState(() => {
      return {projectData: newHead};
    })
  }

  render() {
    return (
      <Container>
        <ProjectColumn task={this.state.projectData} changeHead={this.changeHead}/>
        <TaskView name={this.state.projectData.name} completion={this.state.projectData.percentage} description="test" dueDate={new Date(2020, 2, 24)} startDate={new Date(2020, 2, 14)} status="active" assignedTo="User1" tags={testTaskTags} owner={testOwner} sharedUsers={testSharedWith} />
        <SubTaskColumn subtasks={this.state.projectData.subtasks} changeHead={this.changeHead}></SubTaskColumn>
      </Container>
    );
  }
};
