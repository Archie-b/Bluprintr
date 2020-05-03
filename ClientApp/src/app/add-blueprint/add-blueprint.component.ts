import { Component } from '@angular/core';
import { Blueprint } from '../shared/Blueprint';
import { DrawingCanvas } from '../shared/DrawingCanvas';
import { ImageService } from '../services/image.service';
import { HttpClient } from '@angular/common/http';
import { BlueprintService } from '../services/blueprint.service';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-component-draw-blueprint',
  templateUrl: './add-blueprint.component.html',
  styleUrls: ['./add-blueprint.component.scss']
})
export class AddBlueprintComponent {
  public layers: DrawingCanvas[];
  public blueprint: Blueprint = new Blueprint();
  public error: boolean = false;
  public uploading: boolean = false;
  public ImageFile: File;

  constructor(private blueprintService: BlueprintService, private imageService: ImageService, private _Activatedroute: ActivatedRoute) {
    this.layers = [];
  }

  addLayer(): void {
    var newLayer: DrawingCanvas = new DrawingCanvas('test' + (this.layers.length + 1),
      document.getElementById('CanvasContainer').clientWidth,
      document.getElementById('CanvasContainer').clientHeight);
    newLayer.setColour(this.generateLayerColour());
    document.getElementById('CanvasContainer').appendChild(newLayer.getCanvas());
    this.layers.push(newLayer);
  }

  makeLayerTop(id: string): void {
    document.querySelector('#CanvasContainer').lastChild.after(document.getElementById(id));
  }

  changeComponentColour(id: string): void {
    this.layers.filter(layer => layer.getID() == id)[0].setColour(this.generateLayerColour());
  }

  private generateLayerColour(): string {
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
  }

  deleteLayer(id: string): void {
    this.layers.splice(this.layers.indexOf(this.layers.filter(layer => layer.getID() == id)[0]), 1);
    document.getElementById(id).remove();
  }

  saveBlueprint() {
    this.error = false;
    if (this.validateForm()) {
      this.layers.map(layer => this.blueprint.Components.push(layer.component));
      this.blueprint.DateCreated = moment().format('dd-MM-YYYY hh:mm:ss');
      this.blueprint.Owner = JSON.parse(localStorage.getItem('token')).id;
      this.blueprintService.add(this.blueprint).pipe(
        first())
        .subscribe(
          data => {
            if (data !== undefined) {
              window.location.href = "/blueprint/" + data;
            } else {
              this.error = true;
            }
          },
          error => {
            console.log(error);
          });
    }
  }

  private uploadFileToServer() {

    this.imageService.add(this.ImageFile)
      .pipe(
        first())
      .subscribe(
        data => {
          if (data !== undefined) {
            this.blueprint.Image = data;
          }
          this.uploading = false;
        },
        error => {
          console.log(error);
        });;
  }

  validateForm(): boolean {
    let valid: boolean = true;
    if (this.blueprint.Name == undefined || this.blueprint.Name == '') {
      document.getElementById('TitleInput').classList.add('invalid');
      valid = false;
    } else if (document.getElementById('TitleInput').classList.contains('invalid')) {
      document.getElementById('TitleInput').classList.remove('invalid');
    }
    if (this.blueprint.Description == undefined || this.blueprint.Description == '') {
      document.getElementById('DescriptionInput').classList.add('invalid');
      valid = false;
    } else if (document.getElementById('DescriptionInput').classList.contains('invalid')) {
      document.getElementById('DescriptionInput').classList.remove('invalid');
    }
    if (this.blueprint.Image == undefined || this.blueprint.Image == '') {
      document.getElementById('ImageInput').classList.add('invalid');
      valid = false;
    } else if (document.getElementById('ImageInput').classList.contains('invalid')) {
      document.getElementById('ImageInput').classList.remove('invalid');
    }
    if (this.layers.length > 0) {
      for (let layer of this.layers) {
        if (layer.component.Name == undefined || layer.component.Name == '') {
          document.getElementById(layer.getID() + 'TitleInput').classList.add('invalid');
          valid = false;
        } else if (document.getElementById(layer.getID() + 'TitleInput').classList.contains('invalid')) {
          document.getElementById(layer.getID() + 'TitleInput').classList.remove('invalid');
        }
        if (layer.component.Description == undefined || layer.component.Description == '') {
          document.getElementById(layer.getID() + 'DescriptionInput').classList.add('invalid');
          valid = false;
        } else if (document.getElementById(layer.getID() + 'DescriptionInput').classList.contains('invalid')) {
          document.getElementById(layer.getID() + 'DescriptionInput').classList.remove('invalid');
        }
      }
    }
    return valid;
  }
  updateTags(): void {
    this.blueprint.Tags = (<HTMLTextAreaElement>document.getElementById('TagsInput')).value.split(',').filter(tag => tag != "");
  }

  addFile(e): void {
    this.ImageFile = e.target.files[0];
    this.uploadFileToServer();
  }

}
