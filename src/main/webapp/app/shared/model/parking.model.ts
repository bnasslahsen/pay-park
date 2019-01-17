import { Moment } from 'moment';
import { ILocation } from 'app/shared/model//location.model';
import { IVehicle } from 'app/shared/model//vehicle.model';

export interface IParking {
    id?: number;
    startDate?: Moment;
    endDate?: Moment;
    location?: ILocation;
    vehicle?: IVehicle;
}

export class Parking implements IParking {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public location?: ILocation,
        public vehicle?: IVehicle
    ) {}
}
