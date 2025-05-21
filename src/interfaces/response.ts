import type { Question } from "./questions";
import type { User } from "./user";

export interface Response {
  users: User[];
  questions: Question[];
}
