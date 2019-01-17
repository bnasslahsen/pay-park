/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PayParkTestModule } from '../../../test.module';
import { PricingComponent } from 'app/entities/pricing/pricing.component';
import { PricingService } from 'app/entities/pricing/pricing.service';
import { Pricing } from 'app/shared/model/pricing.model';

describe('Component Tests', () => {
    describe('Pricing Management Component', () => {
        let comp: PricingComponent;
        let fixture: ComponentFixture<PricingComponent>;
        let service: PricingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [PricingComponent],
                providers: []
            })
                .overrideTemplate(PricingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PricingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PricingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Pricing(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pricings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
