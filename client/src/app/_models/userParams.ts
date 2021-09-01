import { User } from "./user";

export class UserParams {
    gender: string;
    minExperience = 0;
    maxExperience = 150;
    pageNumber = 1;
    pageSize = 20;
    orderBy = 'lastActive';

    constructor(user: User) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}