import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
export class ImageService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File) : Observable<Object> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('', formData);
  }
}
