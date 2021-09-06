export interface Project {
    projectId: number;
    number: string;
    name: string;
    status?: any;
    stage?: any;
    plot?: any;
    block?: any;
    site?: any;
    create: Date;
    update: Date;
    comments?: any;
    userProject: any[];
}