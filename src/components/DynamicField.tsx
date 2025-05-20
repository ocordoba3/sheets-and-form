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
            const selectedItems = (form.watch(fieldRendered.field) ?? []) as {
              value: string;
              amount: number;
            }[];

            const selectedItem = selectedItems.find(
              (item) => item.value === option
            );

            const handleCheckboxChange = (checked: boolean) => {
              const current = (form.getValues(fieldRendered.field) ?? []) as {
                value: string;
                amount: number;
              }[];

              const newValue = checked
                ? [...current, { value: option, amount: 1 }]
                : current.filter((item) => item.value !== option);

              form.setValue(fieldRendered.field, newValue);
            };

            return (
              <div key={option} className="flex items-center gap-4">
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
                </div>
                {selectedItem && (
                  <Input
                    type="number"
                    className="w-24"
                    value={selectedItem.amount}
                    min={1}
                    onChange={(e) => {
                      const current = form.getValues(fieldRendered.field) || [];
                      const updated = current.map((item: { value: string }) =>
                        item.value === option
                          ? {
                              ...item,
                              amount: parseInt(e.target.value || "1", 10),
                            }
                          : item
                      );
                      form.setValue(fieldRendered.field, updated);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      );

    case "date":
      return (
        <Input
          className="w-full"
          type="date"
          min={new Date().toDateString()}
          {...field}
        />
      );

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
