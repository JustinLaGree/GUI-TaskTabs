export interface SubTask {
    name: string;
    percentage: number;
    id: number;
    description: string;
    subtasks: SubTask[];
    startDate: Date;
    dueDate: Date;
};
  