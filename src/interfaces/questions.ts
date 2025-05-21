export interface Question {
  order: number;
  category: string;
  service: string;
}

export interface GroupedQuestion {
  [key: string]: Question[];
}
