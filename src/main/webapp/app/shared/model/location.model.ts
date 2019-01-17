import { ICountry } from 'app/shared/model//country.model';

export interface ILocation {
    id?: number;
    postalCode?: string;
    city?: string;
    country?: ICountry;
}

export class Location implements ILocation {
    constructor(public id?: number, public postalCode?: string, public city?: string, public country?: ICountry) {}
}
