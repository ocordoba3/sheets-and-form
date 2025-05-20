import type { FieldType, Form } from "@/interfaces/form";
import type { Question } from "@/interfaces/questions";
import { toSnakeCase } from "@/utils/helpers";

export const FormStructure = (questions: {
  [key: string]: Question[];
}): Form[] => {
  const dynamicQuestions = Object.keys(questions || {}).map((key) => ({
    field: toSnakeCase(key),
    label: key,
    isRequired: true,
    type: "multi_select_and_amount" as FieldType,
    options: [
      ...questions[key].map((question) => question.service),
      "Otro",
      "Ninguno",
    ],
  }));

  return [
    {
      sectionTitle: "Datos del solicitante",
      fields: [
        {
          field: "fecha_solicitud",
          label: "Fecha solicitud",
          type: "date",
          isRequired: true,
        },
        {
          field: "subdireccion",
          label: "Subdirección",
          type: "select",
          isRequired: true,
          options: [
            "Subdirección de Gestión, Redes Sociales e Informalidad (SGRSI)",
            "Subdirección de Emprendimiento, Servicios Empresariales y Comercialización (SESEC)",
          ],
        },
      ],
    },
    {
      sectionTitle: "Datos del evento",
      fields: [
        {
          field: "lugar_del_evento",
          label: "Lugar del evento requerimientos logísticos",
          type: "select",
          isRequired: true,
          options: [
            "20 de Julio",
            "Alameda Vicacha",
            "Bodega la 38",
            "Bodega Usme",
            "Box Coulvert",
            "Centenario",
            "Estación Las Flóres",
            "Furatena",
            "Manzana 22",
            "Parque Olaya",
            "Plaza 7 de Agosto",
            "Plaza de Bolivar",
            "Plaza España",
            "Plaza Fontibón",
            "Plaza La Concordia",
            "Plaza Murillo Toro",
            "Plaza Samper Mendoza",
            "Plazoleta El Rosario",
            "Portal Suba",
            "Quirigua",
            "Rotonda Chapinero",
            "Santa Fe",
            "Santa Lucia",
            "Veracruz",
            "Otros",
          ],
        },
        {
          field: "fecha_inicio_evento",
          label: "Fecha y hora inicio del evento",
          type: "datetime",
          isRequired: true,
        },
        {
          field: "fecha_finalizacion_evento",
          label: "Fecha y hora finalización del evento",
          type: "datetime",
          isRequired: true,
        },
        ...dynamicQuestions,
      ],
    },
  ];
};
