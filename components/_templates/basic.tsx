import React from 'react'
import LetterPullup from '../ui/letter-pullup'
import Link from 'next/link'
import InstagramIcon from "@/public/Instagram_icon.png"
import TwitterIconImage from "@/public/X.svg.png"
import TiktokIcon from "@/public/logo-tiktok-svgrepo-com.svg"
import TelegramIcon from "@/public/Telegram_logo.svg.png"
import ScriptCopyBtn from "../ui/script-copy-btn"
import Image from 'next/image'
import { Button } from '../ui/button'
import { BitcoinIcon } from 'lucide-react'
import { Card, CardContent } from "../ui/card"
import { AspectRatio } from "../ui/aspect-ratio"

interface BasicProps {
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
    imageUrl?: string
    imagePath?: string
  }
}

export function BasicTemplate({ data }: BasicProps) {

  console.log(data);


  return (
    <div className="m-auto p-4">
      <div>
        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AspectRatio ratio={1} className="bg-gray-200 rounded-full overflow-hidden max-w-md">
              {data.imageUrl ? (
                <Image
                  src={data.imageUrl}
                  alt={data.tokenName || "Token image"}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <BitcoinIcon className="w-1/4 h-1/4 text-gray-400" />
                </div>
              )}
            </AspectRatio>

            <div className="flex flex-col gap-3">
              <div>
                <LetterPullup words={data.tokenName || "token name"} delay={0.1} />
              </div>

              <div className="overflow-hidden sm:w-auto">
                <ScriptCopyBtn
                  codeLanguage="solidity"
                  lightTheme="github-light"
                  darkTheme="github-dark"
                  commandMap={{
                    "": "salut"
                  }}
                  showMultiplePackageOptions={false}
                  className="text-sm"
                />
              </div>

              <Card className="shadow-sm">
                <CardContent className="p-3">
                  <p className="whitespace-pre-line break-words text-sm">
                    {data.description || "here your description"}
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button size="sm">Buy Now</Button>

                <div className="flex flex-wrap gap-2">
                  {data.twitter && (
                    <Link href={data.twitter} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Image src={TwitterIconImage} alt="Twitter" width={14} height={14} className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                  {data.telegram && (
                    <Link href={data.telegram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Image src={TelegramIcon} alt="Telegram" width={14} height={14} className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                  {data.tiktok && (
                    <Link href={data.tiktok} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Image src={TiktokIcon} alt="TikTok" width={14} height={14} className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                  {data.insta && (
                    <Link href={data.insta} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Image src={InstagramIcon} alt="Instagram" width={14} height={14} className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
