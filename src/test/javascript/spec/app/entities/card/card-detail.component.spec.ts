/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PayParkTestModule } from '../../../test.module';
import { CardDetailComponent } from 'app/entities/card/card-detail.component';
import { Card } from 'app/shared/model/card.model';

describe('Component Tests', () => {
    describe('Card Management Detail Component', () => {
        let comp: CardDetailComponent;
        let fixture: ComponentFixture<CardDetailComponent>;
        const route = ({ data: of({ card: new Card(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PayParkTestModule],
                declarations: [CardDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CardDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CardDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.card).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
