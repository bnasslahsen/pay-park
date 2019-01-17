import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pricing } from 'app/shared/model/pricing.model';
import { PricingService } from './pricing.service';
import { PricingComponent } from './pricing.component';
import { PricingDetailComponent } from './pricing-detail.component';
import { PricingUpdateComponent } from './pricing-update.component';
import { PricingDeletePopupComponent } from './pricing-delete-dialog.component';
import { IPricing } from 'app/shared/model/pricing.model';

@Injectable({ providedIn: 'root' })
export class PricingResolve implements Resolve<IPricing> {
    constructor(private service: PricingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pricing> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Pricing>) => response.ok),
                map((pricing: HttpResponse<Pricing>) => pricing.body)
            );
        }
        return of(new Pricing());
    }
}

export const pricingRoute: Routes = [
    {
        path: 'pricing',
        component: PricingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.pricing.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pricing/:id/view',
        component: PricingDetailComponent,
        resolve: {
            pricing: PricingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.pricing.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pricing/new',
        component: PricingUpdateComponent,
        resolve: {
            pricing: PricingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.pricing.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pricing/:id/edit',
        component: PricingUpdateComponent,
        resolve: {
            pricing: PricingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.pricing.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pricingPopupRoute: Routes = [
    {
        path: 'pricing/:id/delete',
        component: PricingDeletePopupComponent,
        resolve: {
            pricing: PricingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.pricing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
