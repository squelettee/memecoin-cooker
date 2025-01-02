import React, { useEffect, useState } from 'react'
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
import { useIsMobile } from '@/hooks/use-mobile'

interface SkyscraperProps {
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

function SkyscraperTemplate({ data }: SkyscraperProps) {
  const isMobile = useIsMobile()
  const [colors, setColors] = useState({
    primary: '#FF0000',
    secondary: '#00FF00',
    tertiary: '#FFD700',
    accent1: '#FF1493',
    accent2: '#00FFFF',
    accent3: '#FF00FF',
    accent4: '#FFFF00',
    accent5: '#FF4500'
  })

  const getRandomColor = () => {
    const colors = [
      '#FF0000', '#00FF00', '#FFD700', '#FF1493',
      '#00FFFF', '#FF00FF', '#FFFF00', '#FF4500'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setColors({
        primary: getRandomColor(),
        secondary: getRandomColor(),
        tertiary: getRandomColor(),
        accent1: getRandomColor(),
        accent2: getRandomColor(),
        accent3: getRandomColor(),
        accent4: getRandomColor(),
        accent5: getRandomColor()
      })
    }, 2000) // Slower color changes
    return () => clearInterval(interval)
  }, [])

  const formatAddress = (address: string) => {
    if (!address) return "0x0000000000000000000000000000000000000000"
    if (isMobile) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    return address
  }

  return (
    <div className="w-full h-full flex justify-center items-center" style={{
      background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.tertiary})`,
      animation: 'gradient 5s ease infinite' // Slower gradient animation
    }}>
      <div className="container mx-auto px-4 py-8">
        <div className="p-6 rounded-[2rem] transition-transform duration-300 bg-white" style={{
          borderColor: colors.accent2,
          borderWidth: '12px',
          boxShadow: `12px 12px 0px 0px ${colors.primary}80`
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 transform hover:scale-105 transition-transform duration-300">
              <AspectRatio ratio={16 / 9} className="rounded-3xl overflow-hidden" style={{
                borderColor: colors.accent3,
                borderWidth: '8px'
              }}>
                {data.imageUrl ? (
                  <Image
                    src={data.imageUrl}
                    alt={data.tokenName || "Token image"}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-600">
                    <BitcoinIcon className="w-1/2 h-1/2" style={{ color: colors.accent4 }} />
                  </div>
                )}
              </AspectRatio>

              <Card className="transform hover:rotate-3 transition-transform duration-300" style={{
                borderColor: colors.primary,
                borderWidth: '8px',
                background: `linear-gradient(135deg, white, ${colors.accent5}30)`
              }}>
                <CardContent className="p-6">
                  <p className="text-pretty leading-relaxed font-['Comic_Sans_MS'] text-2xl font-black" style={{ color: colors.accent5 }}>
                    {data.description || "🚀🚀🚀 1000000X INCOMING!!! 💎💎💎 EARLY GEMS!!! 🔥🔥🔥 WAGMI!!! LFG!!! 🌙🌙🌙"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col space-y-8">
              <div className="text-9xl md:text-[12rem] font-black font-['Comic_Sans_MS'] tracking-tighter" style={{
                background: `linear-gradient(45deg, ${colors.accent3}, ${colors.accent4})`,
              }}>
                <LetterPullup words={data.tokenName?.toUpperCase() || "MOON ROCKET"} delay={0.2} />
              </div>

              <div className="w-full transform hover:scale-105 transition-transform duration-300">
                <ScriptCopyBtn
                  codeLanguage=""
                  lightTheme="github-light"
                  darkTheme="github-light"
                  commandMap={{
                    "": formatAddress(data.contractAddress!)
                  }}
                  showMultiplePackageOptions={false}
                  className="text-xl font-bold"
                  style={{
                    borderColor: colors.accent4,
                    borderWidth: '8px',
                    background: `linear-gradient(135deg, white, ${colors.accent4}40)`,
                    boxShadow: `8px 8px 0px 0px ${colors.accent4}99`
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Button size="lg" className="w-full py-8 sm:w-auto text-3xl font-black transform hover:scale-110 transition-transform duration-300" style={{
                  background: `linear-gradient(45deg, ${colors.accent2}, ${colors.accent1})`,
                  color: 'white',
                  fontFamily: 'Comic Sans MS',
                  borderColor: colors.accent1,
                  borderWidth: '8px'
                }}>
                  🚀 APE IN NOW!!! 🚀
                </Button>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                  {data.twitter && (
                    <Link href={data.twitter} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-16 w-16 transform hover:rotate-180 transition-all duration-500" style={{
                        background: `linear-gradient(135deg, white, ${colors.accent2}40)`,
                        borderColor: colors.accent2,
                        borderWidth: '4px'
                      }}>
                        <Image src={TwitterIconImage} alt="Twitter" width={32} height={32} className="h-10 w-10" />
                      </Button>
                    </Link>
                  )}
                  {data.telegram && (
                    <Link href={data.telegram} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-16 w-16 transform hover:rotate-180 transition-all duration-500" style={{
                        background: `linear-gradient(135deg, white, ${colors.accent2}40)`,
                        borderColor: colors.accent2,
                        borderWidth: '4px'
                      }}>
                        <Image src={TelegramIcon} alt="Telegram" width={32} height={32} className="h-10 w-10" />
                      </Button>
                    </Link>
                  )}
                  {data.tiktok && (
                    <Link href={data.tiktok} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-16 w-16 transform hover:rotate-180 transition-all duration-500" style={{
                        background: `linear-gradient(135deg, white, ${colors.accent2}40)`,
                        borderColor: colors.accent2,
                        borderWidth: '4px'
                      }}>
                        <Image src={TiktokIcon} alt="TikTok" width={32} height={32} className="h-10 w-10" />
                      </Button>
                    </Link>
                  )}
                  {data.insta && (
                    <Link href={data.insta} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-16 w-16 transform hover:rotate-180 transition-all duration-500" style={{
                        background: `linear-gradient(135deg, white, ${colors.accent2}40)`,
                        borderColor: colors.accent2,
                        borderWidth: '4px'
                      }}>
                        <Image src={InstagramIcon} alt="Instagram" width={32} height={32} className="h-10 w-10" />
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

export default SkyscraperTemplate