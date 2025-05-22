import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import DynamicField from "@/components/DynamicField";
import { Progress } from "@/components/ui/progress";
import { FormStructure } from "@/components/FormStructure";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import Navbar from "@/components/Navbar";

const FormView = () => {
  const { questions, isLoading } = useStore();
  const form = useForm();
  const [loader, setLoader] = useState({
    progress: 0,
    show: true,
  });

  console.log(questions);

  const formStructure = useMemo(() => FormStructure(questions), [questions]);

  const onSubmit = useCallback(async () => {
    console.log({ usuario: "oecordoba8@gmail.com", ...form.getValues() });

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
  }, [form]);

  useEffect(() => {
    if (loader.progress >= 100 && !isLoading) {
      setLoader((prev) => (prev.show ? { progress: 0, show: false } : prev));
    } else {
      const timer = setTimeout(() => {
        setLoader((prev) => ({
          ...prev,
          progress: prev.progress + (isLoading ? 10 : 30),
        }));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loader.progress, isLoading]);

  if (loader.show) {
    return (
      <div className="w-screen h-screen flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 flex flex-wrap h-[80vh] place-content-center p-4 md:p-0">
          <Progress value={loader.progress} className="w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar onSubmit={onSubmit} />
      <div className="w-screen min-h-[calc(100vh-5rem)] flex flex-wrap justify-center">
        <div className="w-full grid content-start grid-rows-[auto_1fr_auto] p-4">
          <p className="w-full mb-4">
            (<span className="text-red-500">*</span>) Campos requeridos
          </p>
          <Form {...form}>
            <section className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4 max-w-[97vw]">
              {formStructure.map((section, idx) => (
                <div key={`item-${idx}`} className="">
                  <h2 className="text-2xl font-bold bg-gray-800 rounded-md text-white px-2 md:px-8 py-2 w-full text-start">
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
                                <b className="text-red-500">*</b>
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
        </div>
      </div>
    </>
  );
};

export default FormView;
