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
import { memo, useCallback, useMemo } from "react";
import { DateTimePicker } from "./ui/datetimepicker";

interface Props {
  field: ControllerRenderProps;
  fieldRendered: Field;
  form: UseFormReturn;
}

function DynamicField({ field, fieldRendered, form }: Props) {
  const selectedItems = useMemo(() => field.value || [], [field.value]);

  const isNingunoSelected = useMemo(() => {
    return (
      fieldRendered.type === "multi_select_and_amount" &&
      selectedItems.some((item: { value: string }) => item.value === "Ninguno")
    );
  }, [fieldRendered.type, selectedItems]);

  const handleCheckboxChange = useCallback(
    (option: string, checked: boolean) => {
      if (checked) {
        if (option === "Ninguno") {
          form.setValue(fieldRendered.field, [{ value: "Ninguno" }]);
          return;
        }

        // Filtrar "Ninguno" si otro valor es seleccionado
        const updatedItems = selectedItems.filter(
          (item: { value: string }) => item.value !== "Ninguno"
        );

        // Agregar la nueva opción
        form.setValue(fieldRendered.field, [
          ...updatedItems,
          {
            value: option,
            amount: option !== "Otro" ? 1 : undefined,
            description: option === "Otro" ? "" : undefined,
          },
        ]);
      } else {
        // Remover el elemento del array
        form.setValue(
          fieldRendered.field,
          selectedItems.filter(
            (item: { value: string }) => item.value !== option
          )
        );
      }
    },
    [selectedItems, form, fieldRendered.field]
  );

  const handleInputChange = useCallback(
    (
      option: string,
      fieldKey: "description" | "amount",
      value: string | number
    ) => {
      const current = form.getValues(fieldRendered.field) || [];
      const updated = current.map((item: { value: string }) =>
        item.value === option ? { ...item, [fieldKey]: value } : item
      );

      form.setValue(fieldRendered.field, updated);
    },
    [form, fieldRendered.field]
  );

  switch (fieldRendered.type) {
    case "select":
      return (
        <Select
          name={field.name}
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
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
        <div className="space-y-4">
          {fieldRendered.options?.map((option) => {
            const selectedItem = selectedItems.find(
              (item: { value: string }) => item.value === option
            );

            return (
              <div key={option} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${fieldRendered.field}-${option}`}
                    checked={!!selectedItem}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option, Boolean(checked))
                    }
                  />
                  <label
                    htmlFor={`${fieldRendered.field}-${option}`}
                    className="text-base"
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
                          onChange={(e) =>
                            handleInputChange(
                              option,
                              "description",
                              e.target.value
                            )
                          }
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
      return <DateTimePicker field={field} />;

    default:
      return <Input {...field} />;
  }
}

export default memo(DynamicField);
