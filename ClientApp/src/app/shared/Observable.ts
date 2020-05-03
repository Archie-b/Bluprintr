import { Observable } from "rxjs";
import { Promise } from 'es6-promise'
import { Injectable } from "@angular/core";

@Injectable()
export class ServiceWrapper {

  constructor() { }

  ServiceCall(serviceCall: Observable<any>, param: any): any {
    console.log('begin sending');
    this.Send(serviceCall).then((value) => {
      return value;
    }
    );
  }

  private Send(serviceCall: Observable<any>) {
    console.log('sending');
    return new Promise(resolve => {
      serviceCall.subscribe(
        data => {
          resolve(data);
        },
        error => {
          console.log(error);
        })
    })
  }
}
