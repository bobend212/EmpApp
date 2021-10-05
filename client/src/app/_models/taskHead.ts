import { Task } from "./task";

export interface TaskHead {
    taskHead: string;
    tasks: Task[];
    total: number;
}