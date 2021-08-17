import { TimesheetCard } from "./timesheetCard";

export interface AppUser {
    id: number;
    username: string;
    dateOfBirth: Date;
    experience: number;
    created: Date;
    lastActive: Date;
    gender: string;
    title: string;
    timesheetCards: TimesheetCard[];
}