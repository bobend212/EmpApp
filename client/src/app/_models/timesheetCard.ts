import { TimesheetWeek } from "./timesheetWeek";

export interface TimesheetCard {
    timesheetCardId: number;
    created: Date;
    date: Date;
    totalTime: number;
    status: string;
    timesheetWeeks: TimesheetWeek[];
    firstName: string;
    lastName: string;
}