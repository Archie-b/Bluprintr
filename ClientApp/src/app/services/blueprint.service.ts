import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Blueprint } from "../shared/Blueprint";
import { service } from "./service";

@Injectable()
export class BlueprintService implements service<Blueprint> {

  constructor(private http: HttpClient) { }
  add(item: Blueprint): boolean {
    this.http.post<any>('api/blueprint', JSON.stringify(item), { observe: 'response' }).subscribe(response => {
    })

    return false;
  }
  getAll(): Blueprint[] {
    throw new Error("Method not implemented.");
  }
  get(id: string): Blueprint {
    throw new Error("Method not implemented.");
  }

}
