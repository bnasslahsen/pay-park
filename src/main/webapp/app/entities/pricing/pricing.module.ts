import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PayParkSharedModule } from 'app/shared';
import {
    PricingComponent,
    PricingDetailComponent,
    PricingUpdateComponent,
    PricingDeletePopupComponent,
    PricingDeleteDialogComponent,
    pricingRoute,
    pricingPopupRoute
} from './';

const ENTITY_STATES = [...pricingRoute, ...pricingPopupRoute];

@NgModule({
    imports: [PayParkSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PricingComponent,
        PricingDetailComponent,
        PricingUpdateComponent,
        PricingDeleteDialogComponent,
        PricingDeletePopupComponent
    ],
    entryComponents: [PricingComponent, PricingUpdateComponent, PricingDeleteDialogComponent, PricingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PayParkPricingModule {}
