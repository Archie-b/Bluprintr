import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Project } from "../shared/Project";
import { service } from "./service";

@Injectable()
export class ProjectService implements service<Project>  {
  constructor(private http: HttpClient) { }
  add(item: Project): boolean {
    this.http.post<any>('api/project', JSON.stringify(item), { observe: 'response' }).subscribe(response => {
    })
    return false;
  }
  getAll(): Project[] {
    this.http.get<any>('api/get', { observe: 'response' }).subscribe(response => {
      return response.body;
    })
  }
  get(id: string): Project {
    throw new Error("Method not implemented.");
  }
}
