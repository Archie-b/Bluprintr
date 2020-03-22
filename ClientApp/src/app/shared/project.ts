import { Blueprint, SubComponent } from "./Blueprint";
import { ITaggable } from "./TagFilteredList";


export class Project implements ITaggable {

  constructor(p?: Project, b?: Blueprint) {
    console.log('blueprint: ', b);
    if (b !== undefined && b !== null) {
      this.Blueprint = b.Id
      this.Components = b.Components.map((c: SubComponent) => new ProjectComponent(c));
    } else if (p !== undefined && p !== null) {
      this.Tags = p.Tags;
      this.Display = p.Display;
      this.Name = p.Name;
      this.Blueprint = p.Blueprint
      this.Notes = p.Notes;
      this.Components = p.Components;
      this.Owner = p.Owner;
    }
  }

  Tags: string[];
  Display: boolean;
  Name: string;
  Blueprint: string;
  Notes: string[];
  Components: ProjectComponent[];
  Owner: string;
}


export class ProjectComponent {

  constructor(s?: SubComponent) {
    if (s !== undefined) {
      this.BaseComponent = s.Id;
    }
  }
  ID: string;
  BaseComponent: string;
  NeedsReplacing: boolean;
  Notes: string[];
  Code: string;
}
