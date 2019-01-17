/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PayParkTestModule } from '../../../test.module';
import { ParkingComponent } from 'app/entities/parking/parking.component';
import { ParkingService } from 'app/entities/parking/parking.service';
import { Parking } from 'app/shared/model/parking.model';

describe('Component Tests', () => {
    describe('Parking Management Component', () => {
        let comp: ParkingComponent;
        let fixture: ComponentFixture<ParkingComponent>;
        let service: ParkingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [ParkingComponent],
                providers: []
            })
                .overrideTemplate(ParkingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParkingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParkingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Parking(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parkings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
