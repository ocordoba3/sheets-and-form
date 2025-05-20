import FormView from "@/pages/FormView";
import Navbar from "./components/Navbar";
import { useFetchUsers } from "./hooks/useFetchUsers";

export default function App() {
  useFetchUsers();
  return (
    <>
      <Navbar />
      <div className="w-screen min-h-[calc(100vh-81px)] flex flex-wrap justify-center">
        <FormView />
      </div>
    </>
  );
}
