'use client'
import { BasicTemplate } from "./basic"
import { PackType } from "@/validations/template-schema"
import { ProjectStatus } from "@prisma/client"

interface AIAgent {
  context: {
    tokenInfo: string
    description?: string
    customInstructions?: string
  }
  settings: {
    temperature: number
    maxTokens: number
    model: string
  }
}

interface TemplateBasicProps {
  data: {
    // Métadonnées système
    domain?: string
    packType?: PackType
    status?: ProjectStatus

    // Pack BASIC
    tokenName?: string
    tokenSymbol?: string
    contractAddress?: string
    blockchain?: string
    launchDate?: string
    imageUrl?: string

    // Pack MEDIUM
    description?: string
    telegram?: string
    twitter?: string
    dexscreener?: string

    // Pack PREMIUM
    aiAgent?: AIAgent | Record<string, unknown>
    aiPrompt?: string
    aiEnabled?: boolean
    aiLanguages?: string[]

    templateType?: string
    imagePath?: string
  }
  preview?: boolean
}

export function Template({ data, preview }: TemplateBasicProps) {
  return (
    <div className={`flex flex-col justify-center items-center ${preview ? 'h-[90vh]' : 'h-[100vh]'}`}>
      <BasicTemplate data={data} />
    </div>
  )
}