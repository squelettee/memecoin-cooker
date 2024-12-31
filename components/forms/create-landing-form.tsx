'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { formSchema, type DomainFormValues } from '@/app/validations/domain-schema'
import { Button } from '@/components/ui/button'
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
import { useAtom } from 'jotai'
import { domainFormAtom } from '@/app/create/[domain]/page'

interface CreateDomainFormProps {
  domain: string
}

export function CreateDomainForm({ domain }: CreateDomainFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [, setFormData] = useAtom(domainFormAtom)

  const form = useForm<DomainFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: domain,
      tokenName: '',
      contractAddress: '',
      twitter: '',
      description: '',
    },
  })

  async function onSubmit(values: DomainFormValues) {
    setIsLoading(true)
    try {
      // Use atom to update form data
      setFormData(values)
      console.log(values)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="tokenName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your token name"
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
          name="contractAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your contract address"
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
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input
                  placeholder="@pseudo"
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
          name="description"
          render={({ field }) => (
            <FormItem>
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Create'}
        </Button>
      </form>
    </Form>
  )
}
