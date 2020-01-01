import { Component, Inject, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilteredList, ITaggable } from '../shared/TagFilteredList';
import { Blueprint } from '../shared/Blueprint';

@Component({
  selector: 'app-blueprint-list',
  templateUrl: 'blueprint-list.component.html',
  styleUrls: ['blueprint-list.component.css', '../fontawesome/css/all.min.css'],
})

export class BlueprintListComponent {
  public blueprints: FilteredList<Blueprint>;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/blueprint', { observe: 'response' }).subscribe(response => {
      this.blueprints = new FilteredList(response.body['Blueprints'].map((blueprint: Blueprint) => new Blueprint(blueprint)),
        response.body['Tags']);
    }, error => console.error(error));
  }
}
