import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-screen">
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Ingresa al Formulario
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              //   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="tucorreo@email.com"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <Checkbox />
              <span className="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
          </div>

          <Button className="w-full bg-red-700 hover:bg-red-900 text-white font-medium transition-colors">
            Ingresa
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
