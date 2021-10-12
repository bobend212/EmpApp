export interface Estimating {
    estimationId: number;
    panels: number;
    floor: number;
    roof: number;
    steel: number;
    douglasFirs: number;
    gpFrames: number;
    checking: number;
    issuing: number;
    slab: number;
    sections: number;
    other: number;
    total: number;
    issueDate: Date;
    create: Date;
    edit: Date;
    authorId: number;
    editorId: number;
    projectId: number;
    projectFullName: string;
}