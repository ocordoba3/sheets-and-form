import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { schema, type FormDataSchema } from "@/utils/schemas/form";
import { formStructure } from "@/utils/consts/formStructure";
import DynamicField from "@/components/DynamicField";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FormView = () => {
  const form = useForm<FormDataSchema>({
    resolver: zodResolver(schema),
  });
  //   const formValues = form.watch();

  const onSubmit = async () => {
    const formData = new FormData();
    // const { nombre, direccion, ciudad, telefono } = formValues;

    // ⚠️ Reemplaza estos entry.XYZ con los reales de tu Google Form
    // formData.append("entry.1234567890", nombre);
    // formData.append("entry.2345678901", direccion);
    // formData.append("entry.3456789012", ciudad);
    // formData.append("entry.4567890123", telefono);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/TU_ID_DE_FORMULARIO/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );
      alert("Formulario enviado con éxito");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Error al enviar el formulario");
    }
  };
  return (
    <div className="w-full p-4 sm:w-1/2 md:1/3 md:p-0 grid">
      <h1 className="text-3xl font-bold mb-2">
        Solicitud Requerimientos Logísticos
      </h1>
      <p className="tex-sm text-gray-600 mb-4">
        Convenio C01.PCCNTR.7839455 | IPES - SIEC SEM SAS
      </p>
      <Form {...form}>
        <Accordion type="multiple">
          {formStructure.map((section, idx) => (
            <AccordionItem
              value={`item-${idx}`}
              className="border rounded-t-md mb-8"
              key={section.sectionTitle}
            >
              <AccordionTrigger className="text-2xl font-bold rounded-t-md rounded-b-none bg-blue-200 px-4 py-2 w-full text-start">
                {section.sectionTitle}
              </AccordionTrigger>
              <AccordionContent className="p-4">
                {section.fields.map((fieldRendered) => (
                  <FormField
                    key={fieldRendered.field}
                    control={form.control}
                    name={fieldRendered.field as keyof FormDataSchema}
                    render={({ field }) => (
                      <FormItem className="mb-8">
                        <FormLabel className="text-xl">
                          {fieldRendered.label}
                          {fieldRendered.isRequired && (
                            <span className="font-bold text-red-500">*</span>
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button
          className="bg-blue-900 text-white text-xl w-fit place-self-end disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed!"
          type="button"
          onClick={() => onSubmit()}
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default FormView;
