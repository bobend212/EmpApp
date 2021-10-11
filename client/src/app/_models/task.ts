import { Project } from "./project";

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
    projectNumber: string;
    projectName: string;
    userId: number;
    firstName: string;
    lastName: string;
    project: Project
}