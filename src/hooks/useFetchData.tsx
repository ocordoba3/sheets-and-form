import type { Question } from "@/interfaces/questions";
import type { Response } from "@/interfaces/response";
import useStore from "@/store";
import { useEffect } from "react";

function decodeBase64UTF8(base64: string) {
  const binary = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}

export function useFetchData() {
  const { setQuestions, setUsers, setIsLoading } = useStore();

  useEffect(() => {
    setIsLoading(true);
    fetch("/api")
      .then((res) => res.text())
      .then((base64) => {
        const jsonString = decodeBase64UTF8(base64);
        const data: Response = JSON.parse(jsonString);
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
