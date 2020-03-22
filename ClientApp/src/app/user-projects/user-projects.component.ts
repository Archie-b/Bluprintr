import { Component, Inject } from '@angular/core';
import { FilteredList } from "../shared/TagFilteredList";
import { HttpClient } from "@angular/common/http";
import { Project } from '../shared/project';
import { first } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-view-component-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
/** user-projects component*/
export class UserProjectsComponent {
  public projects: FilteredList<Project>;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private projectService: ProjectService) {
    projectService.getForUser(JSON.parse(localStorage.getItem('token')).id).pipe(
      first())
      .subscribe(
        data => {
          this.projects = new FilteredList(data.map((item: Project) => new Project(item)));
        },
        error => {
          console.log(error);
        });
  }
}
