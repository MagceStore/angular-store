import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Note } from 'src/app/store/interfaces/note';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { NoteService } from '../../../services/note.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class NoteDetailComponent implements OnInit {
  note$!: Observable<Note>;
  loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: NoteService
  ) {}

  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.note$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getNoteById(params.get('id')!)
      ),
      tap(() => this.loadingSubject.next(false))
    );
  }

  update(note: Note) {
    this.loadingSubject.next(true);
    this.note$ = this.service
      .update(note)
      .pipe(tap(() => this.loadingSubject.next(false)));
  }

  delete(note: Note) {
    this.loadingSubject.next(true);
    this.service
      .delete(note.id)
      .pipe(
        tap(() => {
          this.loadingSubject.next(false);
          this.router.navigate(['/note/list/']);
        })
      )
      .subscribe();
  }
}
