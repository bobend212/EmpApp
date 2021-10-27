import { TimesheetCard } from "./timesheetCard";

export interface AppUser {
    id: number;
    username: string;
    dateOfBirth: Date;
    experience: number;
    created: Date;
    lastUpdate: Date;
    lastActive: Date;
    gender: string;
    title: string;
    timesheetCards: TimesheetCard[];
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    hireDate: Date;
}