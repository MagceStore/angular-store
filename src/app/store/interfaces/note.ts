import { Pagination } from './pagination';

export interface Note {
  id: number;
  name: string;
  category: number | null;
  description: number;
  start_at: string;
  end_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notes extends Pagination {
  data: Note[];
}
