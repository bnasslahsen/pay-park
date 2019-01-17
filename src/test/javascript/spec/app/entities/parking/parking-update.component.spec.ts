/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PayParkTestModule } from '../../../test.module';
import { ParkingUpdateComponent } from 'app/entities/parking/parking-update.component';
import { ParkingService } from 'app/entities/parking/parking.service';
import { Parking } from 'app/shared/model/parking.model';

describe('Component Tests', () => {
    describe('Parking Management Update Component', () => {
        let comp: ParkingUpdateComponent;
        let fixture: ComponentFixture<ParkingUpdateComponent>;
        let service: ParkingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [ParkingUpdateComponent]
            })
                .overrideTemplate(ParkingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParkingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParkingService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Parking(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parking = entity;
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
                    const entity = new Parking();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parking = entity;
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
