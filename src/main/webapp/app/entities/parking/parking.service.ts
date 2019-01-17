import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParking } from 'app/shared/model/parking.model';

type EntityResponseType = HttpResponse<IParking>;
type EntityArrayResponseType = HttpResponse<IParking[]>;

@Injectable({ providedIn: 'root' })
export class ParkingService {
    public resourceUrl = SERVER_API_URL + 'api/parkings';

    constructor(protected http: HttpClient) {}

    create(parking: IParking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(parking);
        return this.http
            .post<IParking>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(parking: IParking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(parking);
        return this.http
            .put<IParking>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IParking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IParking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(parking: IParking): IParking {
        const copy: IParking = Object.assign({}, parking, {
            startDate: parking.startDate != null && parking.startDate.isValid() ? parking.startDate.format(DATE_FORMAT) : null,
            endDate: parking.endDate != null && parking.endDate.isValid() ? parking.endDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((parking: IParking) => {
                parking.startDate = parking.startDate != null ? moment(parking.startDate) : null;
                parking.endDate = parking.endDate != null ? moment(parking.endDate) : null;
            });
        }
        return res;
    }
}
