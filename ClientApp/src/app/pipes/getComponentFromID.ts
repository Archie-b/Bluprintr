import { Pipe, PipeTransform } from "@angular/core";
import { SubComponent } from "../shared/Blueprint";

@Pipe({

  name: 'getComponentFromID',

  pure: true

})

export class getComponentFromID implements PipeTransform {

  transform(Components: SubComponent[], id: string, args?: any): any {
    console.log(Components);
    console.log(id);
    return this.getComponentFromID(Components,id);

  }

  getComponentFromID(Components: SubComponent[], id: string): SubComponent {

    return Components.filter((component: SubComponent) => component.Id == id)[0];
  }

}
