import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPricing } from 'app/shared/model/pricing.model';
import { AccountService } from 'app/core';
import { PricingService } from './pricing.service';

@Component({
    selector: 'jhi-pricing',
    templateUrl: './pricing.component.html'
})
export class PricingComponent implements OnInit, OnDestroy {
    pricings: IPricing[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected pricingService: PricingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.pricingService.query().subscribe(
            (res: HttpResponse<IPricing[]>) => {
                this.pricings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPricings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPricing) {
        return item.id;
    }

    registerChangeInPricings() {
        this.eventSubscriber = this.eventManager.subscribe('pricingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
