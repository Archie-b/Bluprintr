import { Component, Inject } from '@angular/core';
import { Blueprint } from '../shared/Blueprint';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-component-recent-blueprints',
  templateUrl: './recent-blueprints.component.html',
  styleUrls: ['./recent-blueprints.component.scss']
})
export class RecentBlueprintsComponent {
  blueprints: Blueprint[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('limit', '10');
    http.get<Blueprint[]>(baseUrl + 'api/blueprint', { headers, observe: 'response' }).subscribe(response => {
      this.blueprints = response.body['Blueprints'];
    }, error => console.error(error));
  }
}
