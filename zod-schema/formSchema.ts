import * as z from "zod";

export const formSchema = z.object({
    quantity: z
      .string()
      .or(z.number())
      .refine(
        (value) => {
          if (typeof value === "number") {
            return value > 0;
          }
          return !isNaN(Number(value)) && Number(value) > 0;
        },
        {
          message: "Quantity must be a number greater than 0",
        }
      ),
    length:z.enum([
        "2400mm",
        "2500mm",
        "2600mm",
        "2700mm",
        "2800mm",
        "2900mm",
        "3000mm",
        "3100mm",
      ]),
    drying: z.enum(["KD", "AD", "Heat Treated"]),
    strength: z.enum(["No Strength grade", "C24", "C18"]),
    visual: z.enum(["C(V)", "B (OS I-IV)", "S/F (I-V)"]),
    certified: z.enum(["No Certificate", "FSC or PEFC", "ISPM15"]).optional(),
    moisture: z.enum(["10-14", "18-21", "15-18"]).optional(),
    impregnation: z.enum(["Impregnated", "Not Impregnated"]).optional(),
  });