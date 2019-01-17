import { Moment } from 'moment';
import { IParking } from 'app/shared/model//parking.model';

export interface INotification {
    id?: number;
    date?: Moment;
    message?: string;
    parking?: IParking;
}

export class Notification implements INotification {
    constructor(public id?: number, public date?: Moment, public message?: string, public parking?: IParking) {}
}
