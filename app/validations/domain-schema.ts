import { z } from "zod";

export const formSchema = z.object({
  domain: z.string().min(1, "Le nom de domaine est requis"),
  tokenName: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  contractAddress: z.string().min(2, {
    message: "L'adresse doit comporter au moins 2 caractères.",
  }),
  twitter: z
    .string()
    .min(1, { message: "Le pseudo Twitter est requis" })
    .regex(/^@?[\w\d]+$/, {
      message: "Veuillez entrer un pseudo Twitter valide (ex: @pseudo)"
    })
    .transform((str) => str.startsWith('@') ? str.substring(1) : str),
  description: z.string().min(10, {
    message: "La description doit comporter au moins 10 caractères.",
  }),
});

export type DomainFormValues = z.infer<typeof formSchema>; 