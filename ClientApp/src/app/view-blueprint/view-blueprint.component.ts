import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blueprint } from '../shared/Blueprint';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blueprint-viewer',
  templateUrl: 'view-blueprint.component.html',
  styleUrls: ['view-blueprint.component.css'],
})
export class ViewBlueprint {
  private blueprint: Blueprint;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _Activatedroute:ActivatedRoute) {
    http.get<Blueprint>(baseUrl + `api/blueprint/${this._Activatedroute.snapshot.paramMap.get("id")}`, { observe: 'response' }).subscribe(response => {
      this.blueprint = response.body;
    }, error => console.error(error));
  }
}
