import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NConformityMenuService {
  private ncData = new BehaviorSubject<any>({});
  currentNC = this.ncData.asObservable();

  constructor() { }

  setNCData(data: any) {
    this.ncData.next(data);
  }

  getNCData() {
    return this.ncData.value;
  }

  clearNCData() {
    this.ncData.next(null);
  }
}
