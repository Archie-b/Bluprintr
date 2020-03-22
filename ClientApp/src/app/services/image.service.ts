import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { IService } from "./service";
import { Injectable, Inject } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class ImageService implements IService<File> {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  add(item: File) {
    const fd : FormData = new FormData();
    fd.append('image', item);
    return this.http.post<any>(this.baseUrl + 'api/image', fd, { observe: "response", reportProgress: true }).pipe(map(response => { return response.body }));
  }

  getAll() {
    throw new Error("Method not implemented.");
  }

  get(id: string) {
    throw new Error("Method not implemented.");
  }

}
