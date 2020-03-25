export interface SubTask {
    name: string;
    percentage: number;
    id: number;
    description: string;
    startDate: Date;
    dueDate: Date;
    status: string;
    assignee: string;
    tags: Tag[];
    owner: User;
    sharedWith: User[];
    subtasks: SubTask[];
};
  
interface User {
    id: number;
    name: string;
};

interface Tag {
    tag: string;
    id: number;
}
  