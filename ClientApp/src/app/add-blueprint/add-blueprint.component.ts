import { Component, Inject } from '@angular/core';
import { Blueprint } from '../shared/Blueprint';
@Component({
  templateUrl: 'add-blueprint.component.html',
  styleUrls: ['add-blueprint.component.css'],
})

export class AddBlueprint {
  private styles: Object;
  private components: SubComponent[];

  constructor() {
    this.styles = {
      "formGroup": "form-group w-75 mx-auto",
    }
  }
}

class SubComponent {
  public id: string;
  public title : string;
}
