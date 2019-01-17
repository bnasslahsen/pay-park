import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPricing } from 'app/shared/model/pricing.model';

type EntityResponseType = HttpResponse<IPricing>;
type EntityArrayResponseType = HttpResponse<IPricing[]>;

@Injectable({ providedIn: 'root' })
export class PricingService {
    public resourceUrl = SERVER_API_URL + 'api/pricings';

    constructor(protected http: HttpClient) {}

    create(pricing: IPricing): Observable<EntityResponseType> {
        return this.http.post<IPricing>(this.resourceUrl, pricing, { observe: 'response' });
    }

    update(pricing: IPricing): Observable<EntityResponseType> {
        return this.http.put<IPricing>(this.resourceUrl, pricing, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPricing>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPricing[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
