import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IParking } from 'app/shared/model/parking.model';
import { ParkingService } from './parking.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { VehicleService } from 'app/entities/vehicle';

@Component({
    selector: 'jhi-parking-update',
    templateUrl: './parking-update.component.html'
})
export class ParkingUpdateComponent implements OnInit {
    parking: IParking;
    isSaving: boolean;

    locations: ILocation[];

    vehicles: IVehicle[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected parkingService: ParkingService,
        protected locationService: LocationService,
        protected vehicleService: VehicleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parking }) => {
            this.parking = parking;
        });
        this.locationService.query({ filter: 'parking-is-null' }).subscribe(
            (res: HttpResponse<ILocation[]>) => {
                if (!this.parking.location || !this.parking.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.parking.location.id).subscribe(
                        (subRes: HttpResponse<ILocation>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.vehicleService.query().subscribe(
            (res: HttpResponse<IVehicle[]>) => {
                this.vehicles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parking.id !== undefined) {
            this.subscribeToSaveResponse(this.parkingService.update(this.parking));
        } else {
            this.subscribeToSaveResponse(this.parkingService.create(this.parking));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParking>>) {
        result.subscribe((res: HttpResponse<IParking>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVehicleById(index: number, item: IVehicle) {
        return item.id;
    }
}
