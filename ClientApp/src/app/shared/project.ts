import { Blueprint, SubComponent } from './Blueprint';
import { ITaggable } from './TagFilteredList';
import { v4 as uuidv4 } from 'uuid';


export class Project implements ITaggable {

  constructor(p?: Project, b?: Blueprint) {
    if (b !== undefined && b !== null) {
      this.Blueprint = b.Id;
      this.Components = b.Components.map((c: SubComponent) => new ProjectComponent(c));
    } else if (p !== undefined && p !== null) {
      this.Id = p.Id;
      this.Tags = p.Tags;
      this.Name = p.Name;
      this.Blueprint = p.Blueprint;
      this.Notes = p.Notes;
      this.Components = p.Components;
      this.Owner = p.Owner;
      this.Description = p.Description;
      this.DateCreated = p.DateCreated;
    }
    this.Display = true;
  }
  Id : string;
  Tags: string[];
  Display: boolean;
  Name: string;
  Blueprint: string;
  Notes: string;
  Components: ProjectComponent[];
  Owner: string;
  Description: string;
  DateCreated: string;
}


export class ProjectComponent {

  constructor(s?: SubComponent) {
    if (s !== undefined) {
      this.BaseComponent = s.Id;
      this.NeedsReplacing = false;
      this.Notes = '';
      this.Code = this.GenerateCode();
    }
  }
  ID: string;
  BaseComponent: string;
  NeedsReplacing: boolean;
  Notes: string;
  Code: string;


  private GenerateCode(): string {
    return uuidv4().substring(0, 8);
  }
}
