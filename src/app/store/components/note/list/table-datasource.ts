import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Note, Notes } from 'src/app/store/interfaces/note';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { NoteService } from '../../../services/note.service';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<Note> {
  total: number = 0;
  pageSize: number = 10;
  currentPage = 0;
  dataForSelection: Note[] = [];

  private dataSubject = new BehaviorSubject<Note[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private _service: NoteService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Note[]> {
    return this.dataSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  getData(search = ''): void {
    let sorts = '';
    if (this.sort && this.sort.active && this.sort.direction != '') {
      sorts = this.sort.active;
      if (this.sort.direction === 'asc') {
        sorts = sorts + ',0';
      } else {
        sorts = sorts + ',1';
      }
    }

    let index = this.currentPage + 1;
    let pageSize = this.pageSize;
    if (this.paginator) {
      index = this.paginator.pageIndex + 1;
      pageSize = this.paginator.pageSize;
    }

    this.loadingSubject.next(true);
    this._service
      .getNoteList(index, pageSize, sorts, search)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (response: Notes) => {
          this.dataSubject.next(response.data);
          this.dataForSelection = response.data;
          this.pageSize = response.per_page;
          this.total = response.total;
        },
        error: () => of([]),
      });
  }
}
