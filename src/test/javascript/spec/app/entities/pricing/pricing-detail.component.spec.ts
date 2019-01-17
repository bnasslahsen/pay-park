/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PayParkTestModule } from '../../../test.module';
import { PricingDetailComponent } from 'app/entities/pricing/pricing-detail.component';
import { Pricing } from 'app/shared/model/pricing.model';

describe('Component Tests', () => {
    describe('Pricing Management Detail Component', () => {
        let comp: PricingDetailComponent;
        let fixture: ComponentFixture<PricingDetailComponent>;
        const route = ({ data: of({ pricing: new Pricing(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [PricingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PricingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PricingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pricing).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
