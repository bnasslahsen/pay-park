import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPricing } from 'app/shared/model/pricing.model';
import { PricingService } from './pricing.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
    selector: 'jhi-pricing-update',
    templateUrl: './pricing-update.component.html'
})
export class PricingUpdateComponent implements OnInit {
    pricing: IPricing;
    isSaving: boolean;

    locations: ILocation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected pricingService: PricingService,
        protected locationService: LocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pricing }) => {
            this.pricing = pricing;
        });
        this.locationService.query({ filter: 'pricing-is-null' }).subscribe(
            (res: HttpResponse<ILocation[]>) => {
                if (!this.pricing.location || !this.pricing.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.pricing.location.id).subscribe(
                        (subRes: HttpResponse<ILocation>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pricing.id !== undefined) {
            this.subscribeToSaveResponse(this.pricingService.update(this.pricing));
        } else {
            this.subscribeToSaveResponse(this.pricingService.create(this.pricing));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPricing>>) {
        result.subscribe((res: HttpResponse<IPricing>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }
}
