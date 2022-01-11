import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { Note } from 'src/app/store/interfaces/note';
import { NoteService } from 'src/app/store/services/note.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { TableDataSource } from './table-datasource';

@Component({
  selector: 'app-note-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [NoteService],
})
export class NoteListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Note>;
  @ViewChild('search') search!: ElementRef;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'name',
    'category',
    'parent',
    'start',
    'end',
    'completed',
  ];
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private _service: NoteService) {
    this.dataSource = new TableDataSource(this._service);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.dataSource.updateData(this.search.nativeElement.value);
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.dataSource.updateData(this.search.nativeElement.value))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.dataSource.getData();
  }
}
