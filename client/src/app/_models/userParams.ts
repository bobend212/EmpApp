import { User } from "./user";

export class UserParams {
    gender: string;
    minExperience = 2;
    maxExperience = 150;
    pageNumber = 1;
    pageSize = 5;

    constructor(user: User) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}