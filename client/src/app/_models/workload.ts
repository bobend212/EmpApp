import { Project } from "./project";

export interface Workload {
    workloadId: number;
    orderPlaced: Date;
    site: string;
    designInfo: string;
    drgsReceived: boolean;
    engReceived: boolean;
    slabStage: string;
    bRegsStage: string;
    productionStage: string;
    issued: boolean;
    planner: string;
    estimDesignTime: number;
    slabRequired: Date;
    slabEstimated: Date;
    slabIssued: Date;
    bRegsRequired: Date;
    bRegsEstimated: Date;
    bRegsIssued: Date;
    fullSetRequired: Date;
    fullSetEstimated: Date;
    fullSetIssued: Date;
    issuingRequired: Date;
    issuingEstimated: Date;
    issuingIssued: Date;
    delivery: Date;
    comments: string;
    projectId: number;
    projectNumber: string;
    projectName: string;
}