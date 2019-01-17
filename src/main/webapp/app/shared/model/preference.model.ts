import { IUser } from 'app/core/user/user.model';

export interface IPreference {
    id?: number;
    mail?: boolean;
    sms?: boolean;
    user?: IUser;
}

export class Preference implements IPreference {
    constructor(public id?: number, public mail?: boolean, public sms?: boolean, public user?: IUser) {
        this.mail = this.mail || false;
        this.sms = this.sms || false;
    }
}
