import { z } from "zod";

export const domainNameSchema = z.object({
  domainName: z.string()
    .min(1, "Domain name is required")
    .regex(/^[a-z0-9-]+$/, "Domain name can only contain lowercase letters, numbers, and hyphens")
    .min(3, "Domain name must be at least 3 characters long")
    .max(15, "Domain name cannot exceed 15 characters")
});

export type DomainNameFormValues = z.infer<typeof domainNameSchema>; 