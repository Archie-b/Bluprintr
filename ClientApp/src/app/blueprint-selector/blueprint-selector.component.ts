import { Component, Inject } from '@angular/core';
import { FilteredList } from '../shared/TagFilteredList';
import { Blueprint } from '../shared/Blueprint';
import { HttpClient } from '@angular/common/http';
import { BlueprintService } from '../services/blueprint.service';
import { ProjectService } from '../services/project.service';
import { first } from 'rxjs/operators';
import { Project } from '../shared/project';

@Component({
  selector: 'app-view-component-blueprint-selector',
  templateUrl: './blueprint-selector.component.html',
  styleUrls: ['./blueprint-selector.component.scss']
})

export class BlueprintSelectorComponent {
  public blueprints: FilteredList<Blueprint>;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private blueprintService: BlueprintService, private projectService: ProjectService) {
    this.blueprintService.getAll().pipe(
      first())
      .subscribe(
        data => {
          this.blueprints = new FilteredList(data.map((item: Blueprint) => new Blueprint(item)));
        },
        error => {
          console.log(error);
        });
  }

  createProject(blueprintID : string) {
    this.projectService.add(new Project()).pipe(
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
