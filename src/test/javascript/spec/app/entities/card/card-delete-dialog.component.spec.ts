/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PayParkTestModule } from '../../../test.module';
import { CardDeleteDialogComponent } from 'app/entities/card/card-delete-dialog.component';
import { CardService } from 'app/entities/card/card.service';

describe('Component Tests', () => {
    describe('Card Management Delete Component', () => {
        let comp: CardDeleteDialogComponent;
        let fixture: ComponentFixture<CardDeleteDialogComponent>;
        let service: CardService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [CardDeleteDialogComponent]
            })
                .overrideTemplate(CardDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardService);
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
