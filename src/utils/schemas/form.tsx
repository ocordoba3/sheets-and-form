import { z } from "zod";

export const schema = z.object({
  // Datos del solicitante
  fecha_solicitud: z.coerce.date({ required_error: "Campo requerido" }),
  subdireccion: z.string().min(1, "Campo requerido"),

  // Datos del evento
  lugar_del_evento: z.string().min(1, "Campo requerido"),
  fecha_inicio_evento: z.coerce.date({ required_error: "Campo requerido" }),
  fecha_finalizacion_evento: z.coerce.date({
    required_error: "Campo requerido",
  }),

  requerimientos_audio_video: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_catering: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  xxxxxx: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_espacios: z.string().min(1, "Campo requerido"),

  requerimientos_estructuras_exteriores: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_publicidad: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_mobiliario: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_personal: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_servicios_audiovisuales: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_servicios_salud_emergencia: z
    .string()
    .min(1, "Campo requerido"),

  requerimientos_suministro_energia: z
    .array(
      z.object({
        nombre: z.string().min(1),
        cantidad: z.number().min(1),
      })
    )
    .min(1, "Campo requerido"),

  requerimientos_transporte: z.string().min(1, "Campo requerido"),
});

export type FormDataSchema = z.infer<typeof schema>;
