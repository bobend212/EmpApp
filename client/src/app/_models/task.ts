export interface Task {
    taskItemId: number;
    name: string;
    create: Date;
    edit: Date;
    authorId: number;
    editorId: number;
    estimatedTime: number;
    itemStage: string;
    projectId: number;
    userId: number;
}