import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blueprint } from '../shared/Blueprint';
import { ActivatedRoute } from '@angular/router';
import { BlueprintService } from '../services/blueprint.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'blueprint-viewer',
  templateUrl: 'view-blueprint.component.html',
  styleUrls: ['view-blueprint.component.css']
})
export class ViewBlueprint {
  private blueprint: Blueprint;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private _Activatedroute: ActivatedRoute, blueprintService: BlueprintService) {
    blueprintService.get(`${this._Activatedroute.snapshot.paramMap.get('id')}`).pipe(
      first())
      .subscribe(
        data => {
          this.blueprint = new Blueprint(data);
        },
        error => {
          console.log(error);
        });
  }
  TranslateCoordinates(coords: string): string {
    const splitCoords: number[] = coords.split(',').map((coord: string) => parseFloat(coord)),
      width = document.getElementById('BlueprintInfo').clientWidth,
      height = document.getElementById('BlueprintInfo').clientHeight;
    for (let i = 0; i < splitCoords.length; i++) {
      if (i % 2 === 0) {
        splitCoords[i] = splitCoords[i] * width;
      } else {
        splitCoords[i] = splitCoords[i] * height;
      }
    }
    return splitCoords.join(',');
  }
}
