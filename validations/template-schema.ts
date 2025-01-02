import { z } from "zod";

export const templateSchema = z.object({
  domain: z.string().min(1, "Domain name is required"),
  tokenName: z.string().min(2, {
    message: "The name must be at least 2 characters long.",
  }).max(8, {
    message: "The name must be at most 8 characters long.",
  }),
  contractAddress: z.string().min(2, {
    message: "The address must be at least 2 characters long.",
  }),
  twitter: z
    .string()
    .optional()
    .transform((str) => str ? (str.startsWith('@') ? str.substring(1) : str) : undefined),
  description: z.string()
    .min(10, {
      message: "The description must be at least 10 characters long.",
    })
    .max(250, {
      message: "The description must be at most 250 characters long.",
    })
    .refine((desc) => (desc.match(/\n/g) || []).length <= 3, {
      message: "The description must have at most 3 line breaks.",
    }),
  telegram: z.string().optional(),
  tiktok: z.string().optional(),
  insta: z.string().optional(),
  dexscreener: z.string().optional(),
  pumpFun: z.string().optional(),
  coinGecko: z.string().optional(),
  coinMarketCap: z.string().optional(),
  birdeye: z.string().optional(),
  dextool: z.string().optional(),
  whitepaper: z.string().optional(),
  templateType: z.enum(["skyscraper", "space", "moon"]).optional(),
  imageUrl: z.string().optional(),
  imagePath: z.string().optional(),
});

export type TemplateFormValues = z.infer<typeof templateSchema>; 