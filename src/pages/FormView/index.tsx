import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import DynamicField from "@/components/DynamicField";
import { Progress } from "@/components/ui/progress";
import { FormStructure } from "@/components/FormStructure";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import Navbar from "@/components/Navbar";

const FormView = () => {
  const { questions, isLoading } = useStore();
  const form = useForm();
  const formData = form.watch();
  const [progress, setProgress] = useState(10);

  const formStructure = useMemo(() => FormStructure(questions), [questions]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onSubmit = async () => {
    console.log({ usuario: "oecordoba8@gmail.com", ...formData });

    // await fetch("/api", {
    //   method: "POST",
    //   body: JSON.stringify({ usuario: "oecordoba8@gmail.com", ...formData }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     alert("Guardado correctamente");
    //     form.reset();
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("Error al guardar");
    //   });
  };

  useEffect(() => {
    if (progress === 100 || !isLoading) return;

    const timer = setTimeout(() => setProgress((prev) => prev + 10), 500);
    return () => clearTimeout(timer);
  }, [progress, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 flex flex-wrap h-[80vh] place-content-center p-4 md:p-0">
        <Progress value={progress} className="w-full" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-screen min-h-[calc(100vh-81px)] flex flex-wrap justify-center">
        <div className="w-full grid content-start grid-rows-[auto_1fr_auto] p-4">
          <p className="w-full mb-4">
            (<span className="text-red-500">*</span>) Campos requeridos
          </p>
          <Form {...form}>
            <section className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4 max-w-[97vw]">
              {formStructure.map((section, idx) => (
                <div key={`item-${idx}`} className="">
                  <h2 className="text-2xl font-bold bg-black text-white px-2 md:px-8 py-2 w-full text-start">
                    {section.sectionTitle}
                  </h2>
                  <div className="p-2 md:p-8 md:max-h-[75vh] md:overflow-y-auto">
                    {section.fields.map((fieldRendered, idx) => (
                      <FormField
                        key={fieldRendered.field}
                        control={form.control}
                        name={fieldRendered.field}
                        render={({ field }) => (
                          <FormItem
                            className={cn({
                              "mb-8": idx + 1 < section.fields.length,
                            })}
                          >
                            <FormLabel className="text-xl mb-2">
                              {fieldRendered.label}
                              {fieldRendered.isRequired && (
                                <span className="font-bold text-red-500">
                                  *
                                </span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <DynamicField
                                field={field}
                                fieldRendered={fieldRendered}
                                form={form}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </Form>

          <Button
            className="md:absolute md:top-6 md:right-8 bg-black text-white text-xl w-fit place-self-end disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed!"
            type="button"
            onClick={() => onSubmit()}
            // disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Enviar
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormView;
