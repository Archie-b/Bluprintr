import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blueprint, SubComponent } from '../shared/Blueprint';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Project, ProjectComponent } from '../shared/project';
import { BlueprintService } from '../services/blueprint.service';
import { ProjectService } from '../services/project.service';
import { getComponentFromID } from '../pipes/getComponentFromID';
import * as moment from 'moment';

@Component({
  selector: 'app-view-component-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})

export class AddProjectComponent {
  private project: Project;
  private blueprint: Blueprint;
  private editing: boolean;

  constructor(private _Activatedroute: ActivatedRoute, private blueprintService: BlueprintService, private projectService: ProjectService) {
    this.editing = this._Activatedroute.snapshot.url.some((segment: UrlSegment) => segment.path === 'edit-project');
    if (this.editing) {
      this.projectService.get(this._Activatedroute.snapshot.paramMap.get('id')).subscribe(response => {
        this.project = new Project(response);
        this.getBlueprint(this.project.Blueprint).then((value: Blueprint) => {
          this.blueprint = value;
        });
      }, error => console.error(error));
    } else {
      this.getBlueprint(this._Activatedroute.snapshot.paramMap.get('id')).then((value: Blueprint) => {
        this.blueprint = value;
        this.project = new Project(null, this.blueprint);
      });
    }
  }

  getBlueprint(id: string) {
    return new Promise(resolve => {
      this.blueprintService.get(id).subscribe(response => {
        resolve(new Blueprint(response));
      },
        error => console.error(error));
    });
  }

  TranslateCoordinates(coords: string): string {
    const splitCoords: number[] = coords.split(',').map((coord: string) => parseFloat(coord)),
      width = document.getElementById('svgHolder').clientWidth,
      height = document.getElementById('svgHolder').clientHeight;
    for (let i = 0; i < splitCoords.length; i++) {
      if (i % 2 === 0) {
        splitCoords[i] = splitCoords[i] * width;
      } else {
        splitCoords[i] = splitCoords[i] * height;
      }
    }
    return splitCoords.join(',');
  }

  ToggleHighlight(id: string): void {
    let svg: HTMLElement = document.getElementById("svg" + id);
    if (svg.classList.contains('highlighted')) {
      svg.classList.remove('highlighted');
    } else {
      svg.classList.add('highlighted');
    }
  }

  SaveProject(): void {
    if (this.validateForm()) {
      if (this.editing) {
        this.projectService.update(this.project).subscribe(response => {
          if (response !== undefined) {
            window.location.href = '/user-projects';
          }
        });
      } else {
        this.project.DateCreated = moment().format('DD-MM-YYYY hh:mm:ss');
        this.project.Owner = JSON.parse(localStorage.getItem('token')).id;
        this.projectService.add(this.project).subscribe(response => {
          if (response !== undefined) {
            window.location.href = '/user-projects';
          }
        },
          error => console.error(error));
      }
    }
  }

  validateForm(): boolean {
    let valid: boolean = true;
    if (this.project.Name === undefined || this.project.Name === '') {
      document.getElementById('TitleInput').classList.add('invalid');
      valid = false;
    } else if (document.getElementById('TitleInput').classList.contains('invalid')) {
      document.getElementById('TitleInput').classList.remove('invalid');
    }
    if (this.project.Description === undefined || this.project.Description == '') {
      document.getElementById('DescriptionInput').classList.add('invalid');
      valid = false;
    } else if (document.getElementById('DescriptionInput').classList.contains('invalid')) {
      document.getElementById('DescriptionInput').classList.remove('invalid');
    }
    return valid;
  }
}
