import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Blueprint } from "./shared/Blueprint";

@Injectable()
export class BlueprintService {
  constructor(private http: HttpClient) { }

  uploadBlueprint(blueprint: Blueprint): boolean {
    console.log(JSON.stringify(blueprint));
    this.http.post<any>('api/blueprint',  JSON.stringify(blueprint),{ observe: 'response' }).subscribe(response => {
    })
    return false;
  }
}
