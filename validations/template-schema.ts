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
    .min(3, "Domain name must be at least 3 characters long"),
  packType: z.nativeEnum(PackType).default(PackType.BASIC),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.PENDING),

  // Pack BASIC - tous rendus optionnels
  tokenName: z.string().optional(),
  tokenSymbol: z.string().optional(),
  contractAddress: z.string().optional(),
  blockchain: z.string().optional(),
  launchDate: z.string().optional(),
  imageUrl: z.string().optional(),

  // Pack MEDIUM
  description: z.string().optional(),
  telegram: z.string().optional(),
  twitter: z.string().optional(),
  dexscreener: z.string().optional(),

  // Pack PREMIUM
  aiAgent: z.record(z.any()).optional(),
  aiPrompt: z.string().optional(),
  aiEnabled: z.boolean().default(false),
  aiLanguages: z.array(z.string()).default(["en"])
});

export type TemplateFormValues = z.infer<typeof templateSchema>;