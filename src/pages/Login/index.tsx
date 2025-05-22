import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PATHS } from "@/router/paths";
import useStore from "@/store";
import { AlertCircle } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { users } = useStore();
  const [formData, setFormData] = useState({ email: "", rememberMe: false });
  const [showError, setShowError] = useState(false);

  const handleLogin = useCallback(async () => {
    const userExists = users.find((user) => user.email === formData.email);
    if (userExists) {
      sessionStorage.setItem(btoa("email"), btoa(formData.email));
      if (formData.rememberMe) {
        localStorage.setItem(btoa("email"), btoa(formData.email));
      }
      await navigate(PATHS.form);
    } else {
      setShowError(true);
    }
  }, [formData, users, navigate]);

  const handleChange = useCallback((field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const errorAlert = useMemo(() => {
    if (!showError) return null;
    return (
      <div className="w-full bg-white rounded-xl shadow-lg mb-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>No tienes acceso al Formulario.</AlertDescription>
        </Alert>
      </div>
    );
  }, [showError]);

  return (
    <div className="min-h-screen bg-gray-100 grid place-content-center p-4 w-screen">
      {errorAlert}
      <div className="w-full bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Ingresa al Formulario
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              onChange={({ target: { value } }) => handleChange("email", value)}
              value={formData.email}
              type="email"
              placeholder="tucorreo@email.com"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleChange("rememberMe", Boolean(checked))
                }
              />
              <span className="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
          </div>

          <Button
            disabled={!formData.email}
            type="button"
            onClick={() => handleLogin()}
            className="w-full bg-red-700 hover:bg-red-900 text-white font-medium transition-colors"
          >
            Ingresa
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
