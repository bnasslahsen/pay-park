import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParking } from 'app/shared/model/parking.model';

@Component({
    selector: 'jhi-parking-detail',
    templateUrl: './parking-detail.component.html'
})
export class ParkingDetailComponent implements OnInit {
    parking: IParking;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parking }) => {
            this.parking = parking;
        });
    }

    previousState() {
        window.history.back();
    }
}
