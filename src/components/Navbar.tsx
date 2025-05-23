import { Button } from "./ui/button";

interface Props {
  allowSave: boolean;
  onSubmit: () => Promise<void>;
}

const Navbar = ({ allowSave, onSubmit }: Props) => {
  return (
    <header className="sticky top-0 bg-gray-300 border-b border-gray-300  w-full h-20 px-2 md:px-8 py-2 flex justify-between items-center gap-2 z-10">
      <div>
        <h1 className="text-lg md:text-2xl font-bold mb-2 line-clamp-1">
          Solicitud Requerimientos Logísticos
        </h1>
        <p className="line-clamp-1 tex-xs text-gray-600">
          Convenio C01.PCCNTR.7839455 | IPES - SIEC SEM SAS
        </p>
      </div>

      <Button
        className="bg-gray-800 disabled:bg-gray-500 disabled:text-gray-900 self-center text-white text-sm md:text-xl w-fit place-self-end"
        type="button"
        onClick={() => onSubmit()}
        disabled={!allowSave}
      >
        Enviar
      </Button>
    </header>
  );
};

export default Navbar;
