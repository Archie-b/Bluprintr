import { Component } from '@angular/core';
import { Blueprint } from '../shared/Blueprint';
import { ComponentCanvas } from "../shared/ComponentCanvas";

@Component({
  selector: 'app-view-component-draw-blueprint',
  templateUrl: './draw-blueprint.component.html',
  styleUrls: ['./draw-blueprint.component.scss']
})

export class DrawBlueprintComponent {
  public layers: ComponentCanvas[];
  private viewportSize: [number, number];
  public blueprint: Blueprint = new Blueprint();

  constructor() {
    this.layers = [];
    window.onresize = this.resizeCanvases.bind(this);
    this.viewportSize = [window.innerWidth, window.innerHeight]
  }

  addLayer(): void {
    var newLayer: ComponentCanvas = new ComponentCanvas();
    newLayer.setDimenstions(document.getElementById('CanvasContainer').clientWidth, document.getElementById('CanvasContainer').clientHeight);
    newLayer.setID('test' + (this.layers.length + 1));
    document.getElementById('CanvasContainer').appendChild(newLayer.getElement());
    this.layers.push(newLayer);
  }

  makeLayerTop(id: string): void {
    document.querySelector('#CanvasContainer').firstChild.before(document.getElementById(id));
  }

  changeComponentColour(id: string): void {
    console.log(this);
    this.layers.filter(layer => layer.getID() == id);
  }

  private resizeCanvases(): void {
    this.layers.forEach(layer => layer.resize((window.innerWidth / this.viewportSize[0]), (window.innerHeight / this.viewportSize[1])));
    this.viewportSize = [window.innerWidth, window.innerHeight]
  }
}
