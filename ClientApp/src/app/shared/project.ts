import { Blueprint, SubComponent } from "./Blueprint";


export class Project {

  constructor(b?: Blueprint) {
    if (b !== undefined) {
      this.Blueprint = b.Id
      this.Components = b.Components.map((c: SubComponent) => new ProjectComponent(c));
    }
  }

  Blueprint: string;
  Notes: string[];
  Components : ProjectComponent[];
}


export class ProjectComponent {

  constructor(s?: SubComponent) {
    if (s !== undefined) {
      this.BaseComponent = s.Id;
    }
  }
  BaseComponent : string;
  NeedsReplacing: boolean;
  Notes: string[];
  Code : string;
}
