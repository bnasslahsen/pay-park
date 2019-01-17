/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PayParkTestModule } from '../../../test.module';
import { ParkingDeleteDialogComponent } from 'app/entities/parking/parking-delete-dialog.component';
import { ParkingService } from 'app/entities/parking/parking.service';

describe('Component Tests', () => {
    describe('Parking Management Delete Component', () => {
        let comp: ParkingDeleteDialogComponent;
        let fixture: ComponentFixture<ParkingDeleteDialogComponent>;
        let service: ParkingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [ParkingDeleteDialogComponent]
            })
                .overrideTemplate(ParkingDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParkingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParkingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
