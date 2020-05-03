import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Project } from "../shared/project";
import { IService } from "./service";
import { map } from "rxjs/operators";

@Injectable()
export class ProjectService implements IService<Project>  {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  add(item: Project) {
    console.log(JSON.stringify(item));
    return this.http.post<any>(this.baseUrl + 'api/project/post', JSON.stringify(item), { observe: 'response' }).pipe(map(response => {
      return response.body;
    }));
  }
  getAll() {
    this.http.get<any>('api/project/getAll', { observe: 'response' }).subscribe(response => {
      return response.body;
    })
    return [];
  }
  get(id: string) {
    return this.http.get<any>(this.baseUrl + 'api/project/get/' + id, { observe: 'response' })
      .pipe(map(project => {
        return project.body;
      }));
  }
  update(project: Project) {
    return this.http.post<any>(this.baseUrl + 'api/project/update', JSON.stringify(project), { observe: 'response' }).pipe(map(response => {
      return response.body;
    }));
  }
  getForUser(userID: string) {
    return this.http.get<any>(this.baseUrl + 'api/project/getForUser/' + userID, { observe: 'response' })
      .pipe(map(projects => {
        return projects.body;
      }));
  }
  getProjectByComponentCode(userID: string, componentCode: string) {
    return this.http.post<any>(this.baseUrl + 'api/project/getProjectByComponentCode/', JSON.stringify({ "userID": userID, componentCode: componentCode }), { observe: 'response' })
      .pipe(map(projects => {
        return projects.body;
      }));
  }
}
