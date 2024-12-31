'use client'

import { useParams } from 'next/navigation'
import { CreateDomainForm } from '@/components/forms/create-landing-form'
import { atom, useAtom } from 'jotai'
import { TemplateBasic } from '@/components/_templates/template-basic'
import { DomainFormValues } from '@/app/validations/domain-schema'

export const domainFormAtom = atom<DomainFormValues>({
  domain: '',
  tokenName: '',
  contractAddress: '',
  twitter: '',
  description: ''
})

export default function Page() {
  const params = useParams()
  const [formData] = useAtom(domainFormAtom)

  return (
    <main className="flex w-full h-[90vh]">
      <div className='w-full h-full md:w-3/12 border-r border-black p-4'>
        <CreateDomainForm domain={params.domain as string} />
      </div>

      <div className='hidden md:block md:w-9/12 h-full bg-zinc-600'>
        <TemplateBasic data={formData} />
      </div>
    </main>
  )
}