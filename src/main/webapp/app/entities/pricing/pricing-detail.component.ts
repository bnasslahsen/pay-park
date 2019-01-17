import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPricing } from 'app/shared/model/pricing.model';

@Component({
    selector: 'jhi-pricing-detail',
    templateUrl: './pricing-detail.component.html'
})
export class PricingDetailComponent implements OnInit {
    pricing: IPricing;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pricing }) => {
            this.pricing = pricing;
        });
    }

    previousState() {
        window.history.back();
    }
}
