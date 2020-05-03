import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../shared/project';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-component-component-search',
  templateUrl: './component-search.component.html',
  styleUrls: ['./component-search.component.scss']
})
/** component-search component*/
export class ComponentSearchComponent {

  private searchText: string;
  public project: Project;
  private error: boolean;
  /** component-search ctor */
  constructor(private projectService: ProjectService) {

  }

  search() {
    this.projectService.getProjectByComponentCode(JSON.parse(localStorage.getItem('token')).id, this.searchText).pipe(
      first())
      .subscribe(
        data => {
          if (data !== undefined) {
            this.project = new Project(data[0]);
          } else {
            this.error = true;
          }
          console.log(this.project);
        },
        error => {
          console.log(error);
        });
  }
}
