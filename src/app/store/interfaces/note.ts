import { Pagination } from './pagination';

export interface Note {
  id: number;
  name: string;
  category: number;
  description: string;
  start_at: string;
  end_at: string;
  parent_id: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewNote {
  name: string;
  category: number;
  description: string | null;
  start_at: string | null;
  end_at: string | null;
  parent_id: number | null;
}

export interface Notes extends Pagination {
  data: Note[];
}
