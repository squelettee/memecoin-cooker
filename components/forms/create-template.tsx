'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { PackType, ProjectStatus } from '@/validations/template-schema'
import { useForm, FieldErrors } from 'react-hook-form'
import { Template } from '@/components/_templates/template'
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
import { templateSchema, type TemplateFormValues, } from '@/validations/template-schema'
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


const formAtom = atom<TemplateFormValues>({
  domain: '',
  packType: PackType.BASIC,
  status: ProjectStatus.PENDING,
  tokenName: '',
  tokenSymbol: '',
  contractAddress: '',
  blockchain: '',
  launchDate: '',
  imageUrl: '',
  description: '',
  telegram: '',
  twitter: '',
  dexscreener: '',
  aiAgent: undefined,
  aiPrompt: undefined,
  aiEnabled: false,
  aiLanguages: ['en']
})

interface CreateDomainFormProps {
  domain: string
}

export function CreateTemplateForm({ domain }: CreateDomainFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useAtom(formAtom)
  const router = useRouter()

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      domain: domain,
      packType: PackType.BASIC,
      status: ProjectStatus.PENDING,
      tokenName: '',
      tokenSymbol: '',
      contractAddress: '',
      blockchain: '',
      launchDate: '',
      imageUrl: '',
      description: '',
      telegram: '',
      twitter: '',
      dexscreener: '',
      aiAgent: undefined,
      aiPrompt: undefined,
      aiEnabled: false,
      aiLanguages: ['en']
    },
  })

  async function onSubmit(values: TemplateFormValues) {
    setIsLoading(true)
    try {
      await TemplateService.createTemplate(values)
      setFormData(values)
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
    <div className='flex w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-8 max-w-2xl mx-3 md:w-3/12 w-full h-full border-r p-4"
        >
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Accordion type="single" defaultValue="basic-info" className="w-full">
                <AccordionItem value="basic-info">
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
                              placeholder="Token name"
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
                      name="tokenSymbol"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>Token Symbol</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. BTC, ETH"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setFormData({ ...form.getValues(), tokenSymbol: e.target.value })
                              }}
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
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setFormData({ ...form.getValues(), contractAddress: e.target.value })
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="blockchain"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>Blockchain</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Ethereum, BSC"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setFormData({ ...form.getValues(), blockchain: e.target.value })
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
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
                      name="launchDate"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>Launch Date</FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setFormData({ ...form.getValues(), launchDate: e.target.value })
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

            <TabsContent value="medium">
              <Accordion type="single" defaultValue="medium-info" className="w-full">
                <AccordionItem value="medium-info">
                  <AccordionTrigger>Medium Pack Features</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project..."
                              className="resize-none"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setFormData({ ...form.getValues(), description: e.target.value })
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
                              placeholder="https://t.me/..."
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
                      name="twitter"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://twitter.com/..."
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
                      name="dexscreener"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>Dexscreener</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://dexscreener.com/..."
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="premium">
              <Accordion type="single" defaultValue="premium-features" className="w-full">
                <AccordionItem value="premium-features">
                  <AccordionTrigger>Premium Features</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="aiPrompt"
                      render={({ field }) => (
                        <FormItem className='px-3'>
                          <FormLabel>AI Assistant Configuration</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter information about your project so the AI can assist visitors. You can give it a unique personality - maybe make it enthusiastic, professional, or even humorous! Example: This AI knows everything about our revolutionary DeFi platform and loves explaining complex concepts with fun analogies."
                              className="resize-none"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                setFormData({ ...form.getValues(), aiPrompt: e.target.value })
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

      <div className='hidden md:block md:w-9/12 h-full'>
        <Template preview data={formData} />
      </div>
    </div>
  )
}
