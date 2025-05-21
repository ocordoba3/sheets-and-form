import { useFetchData } from "./hooks/useFetchData";
import { Outlet } from "react-router";

export default function App() {
  useFetchData();

  return <Outlet />;
}
