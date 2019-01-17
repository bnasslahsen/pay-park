import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PayParkSharedModule } from 'app/shared';
import { PayParkAdminModule } from 'app/admin/admin.module';
import {
    PreferenceComponent,
    PreferenceDetailComponent,
    PreferenceUpdateComponent,
    PreferenceDeletePopupComponent,
    PreferenceDeleteDialogComponent,
    preferenceRoute,
    preferencePopupRoute
} from './';

const ENTITY_STATES = [...preferenceRoute, ...preferencePopupRoute];

@NgModule({
    imports: [PayParkSharedModule, PayParkAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PreferenceComponent,
        PreferenceDetailComponent,
        PreferenceUpdateComponent,
        PreferenceDeleteDialogComponent,
        PreferenceDeletePopupComponent
    ],
    entryComponents: [PreferenceComponent, PreferenceUpdateComponent, PreferenceDeleteDialogComponent, PreferenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PayParkPreferenceModule {}
