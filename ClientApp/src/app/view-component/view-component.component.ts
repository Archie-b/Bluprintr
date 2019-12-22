import { Component, Input } from '@angular/core';
import { SubComponent } from '../shared/Blueprint';
@Component({
    selector: 'app-view-component',
    templateUrl: './view-component.component.html',
    styleUrls: ['./view-component.component.scss']
})

export class ViewComponentComponent {
  @Input('component') comp: SubComponent;
  @Input('depth') depth: number;
  constructor() {
  }
}
