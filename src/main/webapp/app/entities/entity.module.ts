import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PayParkCountryModule } from './country/country.module';
import { PayParkVehicleModule } from './vehicle/vehicle.module';
import { PayParkPreferenceModule } from './preference/preference.module';
import { PayParkNotificationModule } from './notification/notification.module';
import { PayParkParkingModule } from './parking/parking.module';
import { PayParkLocationModule } from './location/location.module';
import { PayParkPricingModule } from './pricing/pricing.module';
import { PayParkCardModule } from './card/card.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PayParkCountryModule,
        PayParkVehicleModule,
        PayParkPreferenceModule,
        PayParkNotificationModule,
        PayParkParkingModule,
        PayParkLocationModule,
        PayParkPricingModule,
        PayParkCardModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PayParkEntityModule {}
