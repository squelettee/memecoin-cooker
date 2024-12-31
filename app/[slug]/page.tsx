'use client'
import { TemplateBasic } from "@/components/_templates/template-basic"
import React, { use } from "react"

export default function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const data = {
    domain: slug,
    tokenName: 'NomDuToken',
    contractAddress: '0x1234567890abcdef',
    twitter: 'pseudoTwitter',
    description: 'Ceci est une description de projet fictive pour le test.'
  }

  return (
    <main>
      <TemplateBasic data={data} />
    </main>
  )
}