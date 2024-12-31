import { z } from "zod";

export const domainFormSchema = z.object({
  domain: z.string()
    .min(1, "Le nom de domaine est requis")
    .regex(/^[a-z0-9-]+$/, "Le nom de domaine ne peut contenir que des lettres minuscules, des chiffres et des tirets")
    .min(3, "Le nom de domaine doit comporter au moins 3 caractères")
    .max(63, "Le nom de domaine ne peut pas dépasser 63 caractères")
});

export type DomainFormValues = z.infer<typeof domainFormSchema>; 