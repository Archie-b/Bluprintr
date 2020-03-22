import { Component, Inject, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilteredList, ITaggable } from '../shared/TagFilteredList';
import { Blueprint } from '../shared/Blueprint';
import { BlueprintService } from '../services/blueprint.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-blueprint-list',
  templateUrl: 'blueprint-list.component.html',
  styleUrls: ['blueprint-list.component.css', '../fontawesome/css/all.min.css'],
})

export class BlueprintListComponent {
  public blueprints: FilteredList<Blueprint>;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private blueprintService: BlueprintService) {
    blueprintService.getAll().pipe(
      first())
      .subscribe(
        data => {
          this.blueprints = new FilteredList(data.map((item: Blueprint) => new Blueprint(item)));
        },
        error => {
          console.log(error);
        });
  }
}
