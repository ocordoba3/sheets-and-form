import type { Question } from "@/interfaces/questions";
import { useEffect, useState } from "react";

export function useFetchQuestions() {
  const [questions, setQuestions] = useState<{ [key: string]: Question[] }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api?path=questions")
      .then((res) => res.json())
      .then((data: Question[]) => {
        const sortedData = data.sort((a, b) => a.order - b.order);
        const groupedQuestions = sortedData.reduce(
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return { questions, isLoading };
}
