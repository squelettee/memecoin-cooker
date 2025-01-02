'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FieldErrors } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { atom, useAtom } from 'jotai'
import { TemplateService } from '@/services/template-service'
import { templateSchema, type TemplateFormValues } from '../../validations/template-schema'
import { useRouter } from 'next/navigation'
import { ConfettiButton } from '../ui/confetti'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formAtom = atom<TemplateFormValues>({
  domain: '',
  tokenName: '',
  contractAddress: '',
  twitter: '',
  description: '',
  templateType: 'skyscraper',
  telegram: '',
  tiktok: '',
  insta: '',
  dexscreener: '',
  pumpFun: '',
  coinGecko: '',
  coinMarketCap: '',
  birdeye: '',
  dextool: '',
  whitepaper: '',
  imageUrl: '',
  imagePath: '',
})

interface CreateDomainFormProps {
  domain: string
}

export function CreateTemplateForm({ domain }: CreateDomainFormProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [, setFormData] = useAtom(formAtom)
  const router = useRouter()

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      domain: domain,
      templateType: "skyscraper",
      tokenName: '',
      description: '',
      contractAddress: '',
      twitter: '',
      telegram: '',
      tiktok: '',
      insta: '',
      dexscreener: '',
      pumpFun: '',
      coinGecko: '',
      coinMarketCap: '',
      birdeye: '',
      dextool: '',
      whitepaper: '',
      imageUrl: '',
      imagePath: '',
    },
  })

  async function onSubmit(values: TemplateFormValues) {
    console.log("Submitting form with values:", values);
    setIsLoading(true)
    try {
      const templateData = {
        ...values,
        templateType: values.templateType as "skyscraper" | "space" | "moon"
      }
      await TemplateService.createTemplate(templateData)
      setFormData(templateData)
      router.push(`/${domain}`)
    } catch (error) {
      console.error('Error during creation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onError = (errors: FieldErrors<TemplateFormValues>) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-8 max-w-2xl mx-3"
      >
        <Tabs defaultValue="template" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>
          <TabsContent value="template">
            <FormField
              control={form.control}
              name="templateType"
              render={({ field }) => (
                <FormItem className='px-3'>
                  <FormLabel>Template Type</FormLabel>
                  <FormControl>
                    <Select defaultValue="skyscraper" onValueChange={(value: "skyscraper" | "space" | "moon") => {
                      field.onChange(value)
                      setFormData({ ...form.getValues(), templateType: value })
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a template type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Template Types</SelectLabel>
                          <SelectItem value="skyscraper">Skyscraper</SelectItem>
                          <SelectItem value="space">Space</SelectItem>
                          <SelectItem value="moon">Moon</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="edit">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Basic Information</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="tokenName"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Token Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Max 20 chars"
                            maxLength={20}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), tokenName: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project..."
                            className="resize-none whitespace-pre-wrap"
                            maxLength={120}
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              const lineBreaks = (value.match(/\n/g) || []).length;
                              if (lineBreaks <= 2) {
                                field.onChange(e);
                                setFormData({
                                  ...form.getValues(),
                                  description: value
                                });
                              }
                            }}
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contractAddress"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Contract Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0x..."
                            maxLength={42}
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(e);
                              setFormData({ ...form.getValues(), contractAddress: value });
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Social Media Links</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="@username"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), twitter: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telegram"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Telegram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Telegram link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), telegram: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tiktok"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>TikTok</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="TikTok link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), tiktok: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="insta"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Instagram link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), insta: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Market/Trading Links</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="dexscreener"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Dexscreener</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dexscreener link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), dexscreener: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pumpFun"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>PumpFun</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="PumpFun link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), pumpFun: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coinGecko"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>CoinGecko</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="CoinGecko link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), coinGecko: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coinMarketCap"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>CoinMarketCap</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="CoinMarketCap link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), coinMarketCap: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birdeye"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Birdeye</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Birdeye link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), birdeye: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dextool"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Dextool</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dextool link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), dextool: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Documentation</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="whitepaper"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Whitepaper</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Whitepaper link"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), whitepaper: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Images</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Image URL"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), imageUrl: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imagePath"
                    render={({ field }) => (
                      <FormItem className='px-3'>
                        <FormLabel>Image Path</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Image path"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setFormData({ ...form.getValues(), imagePath: e.target.value })
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <ConfettiButton className='w-full' type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Create'}
        </ConfettiButton>
      </form>
    </Form>
  )
}
