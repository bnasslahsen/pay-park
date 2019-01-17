import { IUser } from 'app/core/user/user.model';

export interface ICard {
    id?: number;
    type?: string;
    fullName?: string;
    creditCardNumber?: number;
    cvv?: number;
    expirationMonth?: number;
    expirationYear?: number;
    user?: IUser;
}

export class Card implements ICard {
    constructor(
        public id?: number,
        public type?: string,
        public fullName?: string,
        public creditCardNumber?: number,
        public cvv?: number,
        public expirationMonth?: number,
        public expirationYear?: number,
        public user?: IUser
    ) {}
}
