import { Component, Inject, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilteredList, ITaggable } from '../shared/TagFilteredList';
import { Blueprint } from '../shared/Blueprint';

@Component({
  selector: 'app-blueprint-list',
  templateUrl: 'blueprint-list.component.html',
  styleUrls: ['blueprint-list.component.css', '../fontawesome/css/all.min.css'],
})

export class BlueprintList {
  public blueprints: FilteredList<Blueprint>;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Blueprint[]>(baseUrl + 'api/blueprint', { observe: 'response' }).subscribe(response => {
      this.blueprints = new FilteredList(response.body.map(b => new Blueprint(b)));
    }, error => console.error(error));
  }
}
