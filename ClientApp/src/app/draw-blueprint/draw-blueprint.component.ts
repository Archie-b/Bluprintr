import { Component, Input } from '@angular/core';
import { Blueprint } from '../shared/Blueprint';

@Component({
  selector: 'app-view-component-draw-blueprint',
  templateUrl: './draw-blueprint.component.html',
  styleUrls: ['./draw-blueprint.component.scss']
})

export class DrawBlueprintComponent {
  @Input() ImageURL: string;
  public blueprint : Blueprint;
  constructor() {

  }

}
