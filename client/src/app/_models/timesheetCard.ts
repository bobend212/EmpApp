import { TimesheetWeek } from "./timesheetWeek";

export interface TimesheetCard {
    timesheetCardId: number;
    customName: string;
    date: Date;
    totalTime: number;
    status: string;
    timesheetWeeks: TimesheetWeek[];
}