'use client'
import SkyscraperTemplate from "./skyscraper";

interface TemplateBasicProps {
  data: {
    domain?: string
    tokenName?: string
    description?: string
    contractAddress?: string
    twitter?: string
    telegram?: string
    tiktok?: string
    insta?: string
    dexscreener?: string
    pumpFun?: string
    coinGecko?: string
    coinMarketCap?: string
    birdeye?: string
    dextool?: string
    whitepaper?: string
    templateType?: string
    imageUrl?: string
    imagePath?: string
  }
  preview?: boolean
}

export function TemplateBasic({ data, preview }: TemplateBasicProps) {
  return (
    <div className={`flex flex-col justify-center items-center ${preview ? 'h-[90vh]' : 'h-[100vh]'}`}>
      {data.templateType === "skyscraper" && <SkyscraperTemplate data={data} />}
    </div >
  )
}