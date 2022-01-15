import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { Note } from 'src/app/store/interfaces/note';
import { NoteService } from 'src/app/store/services/note.service';

import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

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

  selection = new SelectionModel<Note>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'select',
    'id',
    'name',
    'category',
    'parent',
    'start',
    'end',
    'completed',
  ];
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private _service: NoteService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
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
          this.fetchData(this.search.nativeElement.value);
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.fetchData(this.search.nativeElement.value)))
      .subscribe();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(search = '') {
    this.dataSource.getData(search);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.dataForSelection.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.selection.hasValue()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.dataForSelection);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Note): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

  openDialog() {
    const dialogRef = this.dialog.open(NoteCreateDialog);

    dialogRef.afterClosed().subscribe((result) => {
      this.create(result);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  create(object: any) {
    if (!object.name) {
      this.openSnackBar('please set the name', 'X');
      throw Error('please set the name');
    }

    const note = { ...object };
    note.category = 1;

    this._service.create(note).subscribe({
      next: (note) => {
        this.router.navigate(['/note/detail/' + note.id]);
      },
    });
  }

  batchDetele() {
    let ids: number[] = [];
    this.selection.selected.map((note) => {
      ids.push(note.id);
    });

    this._service
      .batchDelete(ids)
      .pipe(tap(() => this.fetchData(this.search.nativeElement.value)))
      .subscribe();
  }
}

@Component({
  selector: 'note-create-dialog',
  templateUrl: './create.dialog.html',
})
export class NoteCreateDialog {}
