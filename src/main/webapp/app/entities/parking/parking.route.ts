import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Parking } from 'app/shared/model/parking.model';
import { ParkingService } from './parking.service';
import { ParkingComponent } from './parking.component';
import { ParkingDetailComponent } from './parking-detail.component';
import { ParkingUpdateComponent } from './parking-update.component';
import { ParkingDeletePopupComponent } from './parking-delete-dialog.component';
import { IParking } from 'app/shared/model/parking.model';

@Injectable({ providedIn: 'root' })
export class ParkingResolve implements Resolve<IParking> {
    constructor(private service: ParkingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Parking> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Parking>) => response.ok),
                map((parking: HttpResponse<Parking>) => parking.body)
            );
        }
        return of(new Parking());
    }
}

export const parkingRoute: Routes = [
    {
        path: 'parking',
        component: ParkingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.parking.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parking/:id/view',
        component: ParkingDetailComponent,
        resolve: {
            parking: ParkingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.parking.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parking/new',
        component: ParkingUpdateComponent,
        resolve: {
            parking: ParkingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.parking.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parking/:id/edit',
        component: ParkingUpdateComponent,
        resolve: {
            parking: ParkingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.parking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parkingPopupRoute: Routes = [
    {
        path: 'parking/:id/delete',
        component: ParkingDeletePopupComponent,
        resolve: {
            parking: ParkingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'payParkApp.parking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
