import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Project } from "../shared/Project";
import { IService } from "./service";
import { map } from "rxjs/operators";

@Injectable()
export class ProjectService implements IService<Project>  {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  add(item: Project) {
    return this.http.post<any>(this.baseUrl + 'api/project', JSON.stringify(item), { observe: 'response' }).pipe(map(response => {
      return response.body;
    }));
  }
  getAll() {
    this.http.get<any>('api/get', { observe: 'response' }).subscribe(response => {
      return response.body;
    })
    return [];
  }
  get(id: string) {
    throw new Error("Method not implemented.");
  }

  getForUser(userID: string) {
    return this.http.get<any>(this.baseUrl + 'api/project/user/' + userID, { observe: 'response' })
      .pipe(map(projects => {
        return projects.body;
      }));
  } 
}
