import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PayParkSharedModule } from 'app/shared';
import {
    ParkingComponent,
    ParkingDetailComponent,
    ParkingUpdateComponent,
    ParkingDeletePopupComponent,
    ParkingDeleteDialogComponent,
    parkingRoute,
    parkingPopupRoute
} from './';

const ENTITY_STATES = [...parkingRoute, ...parkingPopupRoute];

@NgModule({
    imports: [PayParkSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParkingComponent,
        ParkingDetailComponent,
        ParkingUpdateComponent,
        ParkingDeleteDialogComponent,
        ParkingDeletePopupComponent
    ],
    entryComponents: [ParkingComponent, ParkingUpdateComponent, ParkingDeleteDialogComponent, ParkingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PayParkParkingModule {}
