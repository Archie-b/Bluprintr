import { Component, Inject } from '@angular/core';
import { FilteredList } from '../shared/TagFilteredList';
import { Blueprint } from '../shared/Blueprint';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-view-component-blueprint-selector',
    templateUrl: './blueprint-selector.component.html',
    styleUrls: ['./blueprint-selector.component.scss']
})

export class BlueprintSelectorComponent {
  public blueprints: FilteredList<Blueprint>;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/blueprint', { observe: 'response' }).subscribe(response => {
      this.blueprints = new FilteredList(response.body['Blueprints'].map((blueprint: Blueprint) => new Blueprint(blueprint)),
        response.body['Tags']);
    }, error => console.error(error));
  }
}
