import type { Field } from "@/interfaces/form";
import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "./ui/datepicker";

interface Props {
  field: ControllerRenderProps;
  fieldRendered: Field;
  form: UseFormReturn;
}

function DynamicField({ field, fieldRendered, form }: Props) {
  switch (fieldRendered.type) {
    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {fieldRendered.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "multi_select_and_amount":
      return (
        <div className="space-y-2">
          {fieldRendered.options?.map((option) => {
            const selectedItems = form.watch(fieldRendered.field) || [];
            const isNingunoSelected = selectedItems.some(
              (item: { value: string }) => item.value === "Ninguno"
            );
            const selectedItem = selectedItems.find(
              (item: { value: string }) => item.value === option
            );

            const handleCheckboxChange = (checked: boolean) => {
              let current = form.getValues(fieldRendered.field) || [];

              if (checked) {
                if (option === "Ninguno") {
                  // Solo "Ninguno"
                  form.setValue(fieldRendered.field, [{ value: "Ninguno" }]);
                  return;
                }

                // Si se selecciona otro valor, elimina "Ninguno"
                current = current.filter(
                  (item: { value: string }) => item.value !== "Ninguno"
                );

                form.setValue(fieldRendered.field, [
                  ...current,
                  option === "Otro"
                    ? { value: option, description: "" }
                    : { value: option, amount: 1 },
                ]);
              } else {
                form.setValue(
                  fieldRendered.field,
                  current.filter(
                    (item: { value: string }) => item.value !== option
                  )
                );
              }
            };

            return (
              <div key={option} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${fieldRendered.field}-${option}`}
                    checked={!!selectedItem}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor={`${fieldRendered.field}-${option}`}
                    className="text-sm"
                  >
                    {option}
                  </label>

                  {/* Mostrar campo adicional solo si está seleccionado y "Ninguno" no está seleccionado */}
                  {selectedItem && !isNingunoSelected && (
                    <>
                      {option === "Otro" ? (
                        <Input
                          type="text"
                          className="w-full"
                          placeholder="Especifica"
                          value={selectedItem.description || ""}
                          onChange={(e) => {
                            const current =
                              form.getValues(fieldRendered.field) || [];
                            const updated = current.map(
                              (item: { value: string }) =>
                                item.value === option
                                  ? { ...item, description: e.target.value }
                                  : item
                            );
                            form.setValue(fieldRendered.field, updated);
                          }}
                        />
                      ) : option !== "Ninguno" ? (
                        <Input
                          type="number"
                          className="w-16"
                          min={1}
                          value={selectedItem.amount}
                          onChange={(e) => {
                            const current =
                              form.getValues(fieldRendered.field) || [];
                            const updated = current.map(
                              (item: { value: string }) =>
                                item.value === option
                                  ? {
                                      ...item,
                                      amount: parseInt(
                                        e.target.value || "1",
                                        10
                                      ),
                                    }
                                  : item
                            );
                            form.setValue(fieldRendered.field, updated);
                          }}
                        />
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );

    case "date":
      return <DatePicker field={field} />;

    case "datetime":
      return (
        <Input
          className="w-full"
          type="datetime-local"
          min={new Date().toDateString()}
          {...field}
        />
      );

    default:
      return <Input {...field} />;
  }
}

export default DynamicField;
