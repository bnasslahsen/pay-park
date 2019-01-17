/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PayParkTestModule } from '../../../test.module';
import { PricingDeleteDialogComponent } from 'app/entities/pricing/pricing-delete-dialog.component';
import { PricingService } from 'app/entities/pricing/pricing.service';

describe('Component Tests', () => {
    describe('Pricing Management Delete Component', () => {
        let comp: PricingDeleteDialogComponent;
        let fixture: ComponentFixture<PricingDeleteDialogComponent>;
        let service: PricingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [PricingDeleteDialogComponent]
            })
                .overrideTemplate(PricingDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PricingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PricingService);
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
