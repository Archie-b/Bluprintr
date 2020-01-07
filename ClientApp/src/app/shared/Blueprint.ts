import { ITaggable } from "./TagFilteredList";

export class Blueprint implements ITaggable {

  constructor(b?: any) {
    if (b !== undefined) {
    this.id = b.Id;
    this.name = b.Name;
    this.description = b.Description;
    this.image = b.Image;
    this.Components = b.Components;
    this.tags = b.Tags;
      this.display = true;
    }
  }
  tags: string[];
  display: boolean;
  id: string;
  name: string;
  description: string;
  image: string;
  Components: SubComponent[];
  isPublic : boolean;
}

export class SubComponent {
  constructor(b: any) {
    this.id = b.Id;
    this.name = b.Name;
    this.description = b.Description;
    this.Components = b.Components;
  }
  id: string;
  name: string;
  description: string;
  Components: SubComponent[];
}
