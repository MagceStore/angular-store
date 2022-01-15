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

  getNoteById(id: string): Observable<Interface.Note> {
    return this.http.get<Interface.Note>(
      `${environment.backendUrl}/note/${id}`
    );
  }

  update(note: Interface.Note): Observable<Interface.Note> {
    return this.http.put<Interface.Note>(
      `${environment.backendUrl}/note/${note.id}`,
      note
    );
  }

  create(note: Interface.NewNote): Observable<Interface.Note> {
    return this.http.post<Interface.Note>(
      `${environment.backendUrl}/note/`,
      note
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.backendUrl}/note/${id}`);
  }

  batchDelete(ids: number[]): Observable<boolean> {
    if (ids.length === 0) {
      throw Error('Please set the ids for bach Delete.');
    }

    let idsString: string = ids.join(',');
    const params = new HttpParams().append('ids', idsString);
    return this.http.delete<boolean>(`${environment.backendUrl}/note/batch`, {
      params,
    });
  }
}
