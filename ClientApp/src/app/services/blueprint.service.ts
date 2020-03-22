import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Blueprint } from "../shared/Blueprint";
import { IService } from "./service";
import { map } from "rxjs/operators";

@Injectable()
export class BlueprintService implements IService<Blueprint> {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  add(item: Blueprint) {
    return this.http.post<any>(this.baseUrl + 'api/blueprint', JSON.stringify(item), { observe: 'response' }).pipe(map(response => {
      return response.body;
    }));
  }

  getAll() {
    return this.http.get<any>(this.baseUrl + 'api/blueprint', { observe: 'response' }).pipe(map(blueprints => {
      return blueprints.body['Blueprints'];
    }));
  }

  get(id: string) {
    return this.http.get<any>(this.baseUrl + 'api/blueprint/' + id, { observe: 'response' }).pipe(map(blueprint => {
      return blueprint.body;
    }));
  }
}
