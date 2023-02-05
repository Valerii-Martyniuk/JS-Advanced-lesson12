import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import {
  CategoryRequest,
  CategoryResponse,
} from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/categorys` };

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.api.actions);
  }
  create(action: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.api.actions, action);
  }
  update(action: CategoryRequest, id: number): Observable<CategoryResponse> {
    return this.http.patch<CategoryResponse>(
      `${this.api.actions}/${id}`,
      action
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }
}
