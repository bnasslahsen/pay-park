import { IUser } from 'app/core/user/user.model';

export interface IVehicle {
    id?: number;
    registrationId?: string;
    description?: string;
    user?: IUser;
}

export class Vehicle implements IVehicle {
    constructor(public id?: number, public registrationId?: string, public description?: string, public user?: IUser) {}
}
