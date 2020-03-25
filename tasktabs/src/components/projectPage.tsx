
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
  id: number;
  name: string;
};

interface Tag {
  tag: string;
  id: number;
}


const testTaskTags: Tag[] = [
  { tag: "Tag1", id: 0 },
  { tag: "Tag2", id: 1 },
  { tag: "Tag3", id: 2 },
];

const testOwner: User = { id: 0, name: "Super Steve" };

const testSharedWith: User[] = [
  { id: 1, name: 'Little Steve' },
  { id: 2, name: 'Tiny Steve' },
];

// This is the grossest thing ever
// TODO
// Use database queries to grab all the necessary data here and parse throughout app
const testProjectData: SubTask = {
  name: "Project 1", percentage: 20, id: 0, description: "Project 1", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 28), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [
    {
      name: "Task 1", percentage: 60, id: 1, description: "Task 1", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks:
        [
          { name: "SubTask 1", percentage: 0, id: 7, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
          { name: "SubTask 2", percentage: 100, id: 8, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
          { name: "SubTask 3", percentage: 100, id: 9, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
          { name: "SubTask 4", percentage: 100, id: 10, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
          { name: "SubTask 5", percentage: 0, id: 11, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
        ]
    },
    {
      name: "Task 2", percentage: 0, id: 2, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks:
        [
          {
            name: "Subtask 1", percentage: 0, id: 12, description: "Subtask 1", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks:
              [
                { name: "Sub-Subtask 1", percentage: 0, id: 13, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
                { name: "Sub-Subtask 2", percentage: 0, id: 14, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
                { name: "Sub-Subtask 3", percentage: 0, id: 15, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
                { name: "Sub-Subtask 4", percentage: 0, id: 16, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 26), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
                { name: "Sub-Subtask 5", percentage: 0, id: 17, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
              ]
          },
        ]
    },
    {
      name: "Task 3", percentage: 100, id: 3, description: "completed!", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks:
        [
          { name: "Subtask 1", percentage: 100, id: 13, description: "all finished!", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 27), status: "active", tags: testTaskTags, assignee: "Steve", owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
        ]
    },
    { name: "Task 4", percentage: 50, id: 4, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
    { name: "Task 5", percentage: 81, id: 5, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), status: "active", assignee: "Steve", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, subtasks: [] },
    { name: "Loooooong task name", percentage: 30.7, id: 6, description: "test", startDate: new Date(2020, 2, 14), dueDate: new Date(2020, 2, 24), status: "active", tags: testTaskTags, owner: testOwner, sharedWith: testSharedWith, assignee: "Steve", subtasks: [] },
  ]
};

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

  // TODO
  // assignedTo should probably be a User, not a string. Fine for now with dummy data,
  // but should be replaced.
  render() {
    return (
      <Container>
        <ProjectColumn task={this.state.projectHead} changeHead={this.changeHead} />
        <TaskView
          name={this.state.projectData.name} 
          completion={this.state.projectData.percentage} 
          description={this.state.projectData.description} 
          dueDate={this.state.projectData.dueDate} 
          startDate={this.state.projectData.startDate} 
          status={this.state.projectData.status} 
          assignee={this.state.projectData.assignee} 
          tags={this.state.projectData.tags} 
          owner={this.state.projectData.owner} 
          sharedUsers={this.state.projectData.sharedWith} 
        />
        <SubTaskColumn subtasks={this.state.projectData.subtasks} changeHead={this.changeHead}></SubTaskColumn>
      </Container>
    );
  }
};
