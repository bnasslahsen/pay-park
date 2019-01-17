import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParking } from 'app/shared/model/parking.model';
import { AccountService } from 'app/core';
import { ParkingService } from './parking.service';

@Component({
    selector: 'jhi-parking',
    templateUrl: './parking.component.html'
})
export class ParkingComponent implements OnInit, OnDestroy {
    parkings: IParking[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected parkingService: ParkingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.parkingService.query().subscribe(
            (res: HttpResponse<IParking[]>) => {
                this.parkings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParkings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParking) {
        return item.id;
    }

    registerChangeInParkings() {
        this.eventSubscriber = this.eventManager.subscribe('parkingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
