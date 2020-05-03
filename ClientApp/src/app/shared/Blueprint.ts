import { ITaggable } from './TagFilteredList';

export class Blueprint implements ITaggable {

  constructor(b?: Blueprint) {
    if (b !== undefined) {
      this.Id = b.Id;
      this.Name = b.Name;
      this.Description = b.Description;
      this.Image = b.Image;
      this.Components = b.Components;
      this.Tags = b.Tags;
      this.Display = true;
    } else {
      this.Components = [];
    }
  }
  Tags: string[];
  Display: boolean;
  Id: string;
  Name: string;
  Description: string;
  Image: string;
  Components: SubComponent[];
  IsPublic: boolean;
  DateCreated: string;
  Owner: string;
}

export class SubComponent {
  constructor(b?: SubComponent) {
    if (b !== undefined) {
      this.Id = b.Id;
      this.Name = b.Name;
      this.Description = b.Description;
      this.Components = b.Components;
      this.Map = b.Map;
      this.Colour = b.Colour;
    } else {
      this.Components = [];
      this.Map = '';
    }
  }
  Id: string;
  Name: string;
  Description: string;
  Components: SubComponent[];
  Map: string;
  Colour: string;
}
