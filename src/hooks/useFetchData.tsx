import type { Question } from "@/interfaces/questions";
import type { Response } from "@/interfaces/response";
import useStore from "@/store";
import { useEffect } from "react";

export function useFetchData() {
  const { setQuestions, setUsers, setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(true);
    fetch("/api")
      .then((res) => res.json())
      .then((data: Response) => {
        const { questions, users } = data;
        const sortedQuestions = questions.sort((a, b) => a.order - b.order);
        const groupedQuestions = sortedQuestions.reduce(
          (acc: { [key: string]: Question[] }, item) => {
            const key = item.category as keyof Question;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(item);
            return acc;
          },
          {}
        );
        setQuestions(groupedQuestions);
        setUsers(users);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setIsLoading, setQuestions, setUsers]);
}
