import { Component } from '@angular/core';
import { Blueprint } from '../shared/Blueprint';
import { ComponentCanvas } from "../shared/ComponentCanvas";
import { DrawingCanvas } from '../shared/DrawingCanvas';
import { ImageService } from '../image.service';
import { HttpClient } from '@angular/common/http';
import { BlueprintService } from '../blueprint.service';

@Component({
  selector: 'app-view-component-draw-blueprint',
  templateUrl: './add-blueprint.component.html',
  styleUrls: ['./add-blueprint.component.scss']
})
export class AddBlueprintComponent {
  public layers: DrawingCanvas[];
  public blueprint: Blueprint = new Blueprint();

  constructor(private blueprintService: BlueprintService) {
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

  saveBlueprint(): void {
    if (this.validateForm()) {
      this.layers.map(layer => this.blueprint.Components.push(layer.component));
      this.blueprint.DateCreated = new Date();
      this.blueprintService.uploadBlueprint(this.blueprint);
    }
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

    for (let layer of this.layers) {
      console.log(layer.component);
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
    return valid;
  }
  updateTags(): void {
    this.blueprint.Tags = (<HTMLTextAreaElement>document.getElementById('TagsInput')).value.split(',').filter(tag => tag != "");
  }

  uploadFile(e: Event): void {
    console.log(e);
  }

}
