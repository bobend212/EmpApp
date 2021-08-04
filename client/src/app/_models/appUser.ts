import { TimesheetCard } from "./timesheetCard";

export interface AppUser {
    appUserId: number;
    username: string;
    dateOfBirth: Date;
    experience: number;
    created: Date;
    lastActive: Date;
    gender: string;
    title: string;
    timesheetCards: TimesheetCard[];
}