import { publishReplay } from "rxjs/operators";

export interface Project {
    projectId: number;
    number: string;
    name: string;
    status: string;
    stage: string;
    plot: string;
    block: string;
    site: string;
    create: Date;
    update: Date;
    comments: string;
}