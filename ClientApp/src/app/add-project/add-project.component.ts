import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  templateUrl: 'project-list.component.html',
  styleUrls: ['project-list.component.css'],
})
export class ProjectListComponent {
  public blueprints: any[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/blueprint', { observe: 'response' }).subscribe(response => {
      this.blueprints = response.body;
    }, error => console.error(error));
  }
}
