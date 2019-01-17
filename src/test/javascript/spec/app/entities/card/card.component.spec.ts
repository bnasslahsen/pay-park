/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PayParkTestModule } from '../../../test.module';
import { CardComponent } from 'app/entities/card/card.component';
import { CardService } from 'app/entities/card/card.service';
import { Card } from 'app/shared/model/card.model';

describe('Component Tests', () => {
    describe('Card Management Component', () => {
        let comp: CardComponent;
        let fixture: ComponentFixture<CardComponent>;
        let service: CardService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [CardComponent],
                providers: []
            })
                .overrideTemplate(CardComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CardComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Card(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
