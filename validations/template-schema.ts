import { z } from "zod";

export enum PackType {
  BASIC = 'BASIC',
  MEDIUM = 'MEDIUM',
  PREMIUM = 'PREMIUM'
}

export enum ProjectStatus {
  PENDING = 'PENDING',
  LIVE = 'LIVE'
}

export const templateSchema = z.object({
  // Métadonnées système
  domain: z.string()
    .min(1, "Domain name is required")
    .regex(/^[a-z0-9-]+$/, "Domain name can only contain lowercase letters, numbers, and hyphens")
    .min(3, "Domain name must be at least 3 characters long")
    .max(15, "Domain name cannot exceed 15 characters"),
  packType: z.nativeEnum(PackType).default(PackType.BASIC),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.PENDING),

  // Pack BASIC
  tokenName: z.string()
    .min(2, "Token name must be at least 2 characters long")
    .max(100, "Token name cannot exceed 100 characters"),
  tokenSymbol: z.string()
    .min(1, "Token symbol is required")
    .max(20, "Token symbol cannot exceed 20 characters"),
  contractAddress: z.string()
    .min(1, "Contract address is required")
    .max(100, "Contract address is too long"),
  blockchain: z.string()
    .min(1, "Blockchain is required")
    .max(50, "Blockchain name is too long"),
  launchDate: z.string().datetime("Must be a valid date"),
  imageUrl: z.string().url("Must be a valid URL").optional(),

  // Pack MEDIUM
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long")
    .optional(),
  telegram: z.string().url("Must be a valid URL").optional(),
  twitter: z.string().url("Must be a valid URL").optional(),
  dexscreener: z.string().url("Must be a valid URL").optional(),

  // Pack PREMIUM
  aiAgent: z.record(z.any()).optional(),
  aiPrompt: z.string().optional(),
  aiEnabled: z.boolean().default(false),
  aiLanguages: z.array(z.string()).default(["en"])
});

export type TemplateFormValues = z.infer<typeof templateSchema>;