import type { GroupedQuestion } from "@/interfaces/questions";
import type { User } from "@/interfaces/user";
import { create } from "zustand";

type Store = {
  isLoading: boolean;
  questions: GroupedQuestion;
  users: User[];
  setIsLoading: (isLoading: boolean) => void;
  setQuestions: (questions: GroupedQuestion) => void;
  setUsers: (users: User[]) => void;
};

const useStore = create<Store>()((set) => ({
  isLoading: false,
  questions: {},
  users: [],
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setQuestions: (questions) => set(() => ({ questions })),
  setUsers: (users) => set(() => ({ users })),
}));

export default useStore;
