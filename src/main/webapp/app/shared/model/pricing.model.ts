import { ILocation } from 'app/shared/model//location.model';

export interface IPricing {
    id?: number;
    amoount?: number;
    currency?: string;
    location?: ILocation;
}

export class Pricing implements IPricing {
    constructor(public id?: number, public amoount?: number, public currency?: string, public location?: ILocation) {}
}
