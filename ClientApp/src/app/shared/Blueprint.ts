import { ITaggable } from "./TagFilteredList";

export class Blueprint implements ITaggable {

  constructor(b: any) {
    this.id = b.Id;
    this.name = b.Name;
    this.description = b.Description;
    this.image = b.Image;
    this.components = b.Components;
    this.tags = b.Tags;
    this.display = true;
  }
  tags: string[];
  display: boolean;
  id: string;
  name: string;
  description: string;
  image: string;
  components: SubComponent[];
}

interface SubComponent {
  id: string,
  Name: string,
  Description: string,
  Components: SubComponent[],
}
