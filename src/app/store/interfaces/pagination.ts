export interface Pagination {
  current_page: number;
  first_page_url: string;
  data: any[];
  from: number;
  last_page: number;
  links: Link[];
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}
