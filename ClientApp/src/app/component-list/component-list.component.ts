import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: 'component-list.component.html'
})
export class ComponentListComponent {
  @Input() components: SubComponent[];
}

interface SubComponent {
  id: string,
  Name: string,
  Description: string,
  Components: SubComponent[],
}

