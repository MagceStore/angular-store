import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as Interface from '../interfaces/note';

@Injectable({
  providedIn: 'any',
})
export class NoteService {
  constructor(private http: HttpClient) {}

  getNoteList(
    page: number = 1,
    size: number = 10,
    $sorts: string = '',
    $search: string = ''
  ): Observable<Interface.Notes> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('per-page', size.toString())
      .append('sorts', $sorts)
      .append('search', $search);
    return this.http.get<Interface.Notes>(environment.backendUrl + '/notes', {
      params,
    });
  }

  getNoteById(id: number) {
    return this.http.get<Interface.Note>(
      `${environment.backendUrl}/note/${id}`
    );
  }
}
