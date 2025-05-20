import type { User } from "@/interfaces/user";
import { useEffect, useState } from "react";

export function useFetchUsers() {
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  useEffect(() => {
    fetch("/api?path=users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);
  return users;
}
