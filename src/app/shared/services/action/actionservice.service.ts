import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import {
  ActionRequest,
  ActionResponse,
} from '../../interfaces/action.interface';

@Injectable({
  providedIn: 'root',
})
export class ActionserviceService {
  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/actions` };

  constructor(private http: HttpClient) {}

  getAll(): Observable<ActionResponse[]> {
    return this.http.get<ActionResponse[]>(this.api.actions);
  }
  getOne(id: number): Observable<ActionResponse> {
    return this.http.get<ActionResponse>(`${this.api.actions}/${id}`);
  }
  create(action: ActionRequest): Observable<ActionResponse> {
    return this.http.post<ActionResponse>(this.api.actions, action);
  }
  update(action: ActionRequest, id: number): Observable<ActionResponse> {
    return this.http.patch<ActionResponse>(`${this.api.actions}/${id}`, action);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }
}
