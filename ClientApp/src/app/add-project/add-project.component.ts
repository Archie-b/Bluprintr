import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blueprint } from '../shared/Blueprint';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectComponent } from '../shared/project';

@Component({
  selector: 'app-view-component-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
/** add-project component*/
export class AddProjectComponent {
  private blueprint: Blueprint;
  private project: Project;
  /** add-project ctor */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _Activatedroute: ActivatedRoute) {
    http.get<any>(baseUrl + `api/blueprint/${this._Activatedroute.snapshot.paramMap.get("id")}`, { observe: 'response' }).subscribe(response => {
      this.blueprint = new Blueprint(response.body);
      this.project = new Project(null, this.blueprint);
    }, error => console.error(error));
  }

  TranslateCoordinates(coords: string): string {
    let splitCoords: number[] = coords.split(',').map((coord: string) => parseFloat(coord)),
      width = document.getElementById('svgHolder').clientWidth,
      height = document.getElementById('svgHolder').clientHeight;
    for (let i = 0; i < splitCoords.length; i++) {
      if (i % 2 == 0) {
        splitCoords[i] = splitCoords[i] * width;
      } else {
        splitCoords[i] = splitCoords[i] * height;
      }
    }

    return splitCoords.join(',');
  }

  SelectComponent(id: string): void {

  }


  SaveProject(): void {
  }
}
