/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PayParkTestModule } from '../../../test.module';
import { PricingUpdateComponent } from 'app/entities/pricing/pricing-update.component';
import { PricingService } from 'app/entities/pricing/pricing.service';
import { Pricing } from 'app/shared/model/pricing.model';

describe('Component Tests', () => {
    describe('Pricing Management Update Component', () => {
        let comp: PricingUpdateComponent;
        let fixture: ComponentFixture<PricingUpdateComponent>;
        let service: PricingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [PricingUpdateComponent]
            })
                .overrideTemplate(PricingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PricingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PricingService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Pricing(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pricing = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Pricing();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pricing = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
