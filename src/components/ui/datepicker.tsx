import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ControllerRenderProps } from "react-hook-form";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

interface Props {
  field: ControllerRenderProps;
}

export function DatePicker({ field }: Props) {
  const [selected, setSelected] = useState<Date | undefined>();

  useEffect(() => {
    field.onChange(
      selected ? format(selected, "dd/MM/yyyy", { locale: es }) : undefined
    );
  }, [field, selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected
            ? format(new Date(selected), "dd/MM/yyyy", { locale: es })
            : "Selecciona una fecha"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={selected ? new Date(selected) : undefined}
          onSelect={(date) => setSelected(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
