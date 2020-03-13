import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { service } from "./service";
export class ImageService implements service<File> {

  constructor(private http: HttpClient) { }

  add(item: File): boolean {
    const formData = new FormData();
    formData.append('image', item);
    return true
    //this.http.post('', formData);
  }

  getAll(): File[] {
    throw new Error("Method not implemented.");
  }

  get(id: string): File {
    throw new Error("Method not implemented.");
  }

}
