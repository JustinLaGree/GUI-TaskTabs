
import * as React from 'react';
import styled from 'styled-components';

import { ProjectColumn } from './projectColumn';
import { TaskView } from './taskView';
import { SubTaskColumn } from './subTaskColumn';
import { SubTask } from './subtaskType';

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
`;

interface User {
  id: string;
  name: string;
  idKey: number;
}

interface Tag {
  tag: string;
  id: number;
}

// This is the grossest thing ever
// TODO
// Use database queries to grab all the necessary data here and parse throughout app
const testProjectData: SubTask = {
  name: "Project 1", percentage: 20, id: 0, description: "Project 1", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 28), subtasks: [
    {
      name: "Task 1", percentage: 60, id: 1, description: "Task 1", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), subtasks:
        [
          { name: "SubTask 1", percentage: 0, id: 7, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), subtasks: [] },
          { name: "SubTask 2", percentage: 100, id: 8, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), subtasks: [] },
          { name: "SubTask 3", percentage: 100, id: 9, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), subtasks: [] },
          { name: "SubTask 4", percentage: 100, id: 10, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), subtasks: [] },
          { name: "SubTask 5", percentage: 0, id: 11, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), subtasks: [] },
        ]
    },
    {
      name: "Task 2", percentage: 0, id: 2, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), subtasks:
        [
          {
            name: "Subtask 1", percentage: 0, id: 12, description: "Subtask 1", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), subtasks:
              [
                { name: "Sub-Subtask 1", percentage: 0, id: 13, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), subtasks: [] },
                { name: "Sub-Subtask 2", percentage: 0, id: 14, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), subtasks: [] },
                { name: "Sub-Subtask 3", percentage: 0, id: 15, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), subtasks: [] },
                { name: "Sub-Subtask 4", percentage: 0, id: 16, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), subtasks: [] },
                { name: "Sub-Subtask 5", percentage: 0, id: 17, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), subtasks: [] },
              ]
          },
        ]
    },
    { name: "Task 3", percentage: 100, id: 3, description: "completed!", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), subtasks: 
      [
        { name: "Subtask 1", percentage: 100, id: 13, description: "all finished!", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), subtasks: [] },
      ] 
    },
    { name: "Task 4", percentage: 50, id: 4, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), subtasks: [] },
    { name: "Task 5", percentage: 81, id: 5, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), subtasks: [] },
    { name: "Loooooong task name", percentage: 30.7, id: 6, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), subtasks: [] },
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
export class ProjectPage extends React.Component<{}, { projectHead: SubTask, projectData: SubTask }>{

  constructor(props: {}) {
    super(props);

    this.state = { projectHead: testProjectData, projectData: testProjectData };
  }

  changeHead = (newHead: SubTask) => {
    this.setState(() => {
      return { projectData: newHead };
    })
  }

  render() {
    return (
      <Container>
        <ProjectColumn task={this.state.projectHead} changeHead={this.changeHead} />
        <TaskView name={this.state.projectData.name} completion={this.state.projectData.percentage} description={this.state.projectData.description} dueDate={this.state.projectData.dueDate} startDate={this.state.projectData.startDate} status="active" assignedTo="User1" tags={testTaskTags} owner={testOwner} sharedUsers={testSharedWith} />
        <SubTaskColumn subtasks={this.state.projectData.subtasks} changeHead={this.changeHead}></SubTaskColumn>
      </Container>
    );
  }
};
