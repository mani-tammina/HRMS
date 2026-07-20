import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HireEmployeesService {
  private candidateSource = new BehaviorSubject<any>(null);
  currentCandidate = this.candidateSource.asObservable();

  setCandidate(candidate: any) {
    this.candidateSource.next(candidate);
  }
}
