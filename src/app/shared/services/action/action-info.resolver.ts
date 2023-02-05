import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionResponse } from '../../interfaces/action.interface';
import { ActionserviceService } from './actionservice.service';

@Injectable({
  providedIn: 'root',
})
export class ActionInfoResolver implements Resolve<ActionResponse> {
  constructor(private actionService: ActionserviceService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ActionResponse> {
    return this.actionService.getOne(Number(route.paramMap.get('id')));
  }
}
