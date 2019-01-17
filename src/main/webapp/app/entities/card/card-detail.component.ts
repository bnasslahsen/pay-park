import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICard } from 'app/shared/model/card.model';

@Component({
    selector: 'jhi-card-detail',
    templateUrl: './card-detail.component.html'
})
export class CardDetailComponent implements OnInit {
    card: ICard;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ card }) => {
            this.card = card;
        });
    }

    previousState() {
        window.history.back();
    }
}
