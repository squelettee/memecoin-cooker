'use client'

import { useParams } from 'next/navigation'
import { CreateTemplateForm } from '@/components/forms/create-template'
import { atom, useAtom } from 'jotai'
import { TemplateBasic } from '@/components/_templates/template-basic'
import { TemplateFormValues } from '@/validations/template-schema'

const domainFormAtom = atom<TemplateFormValues>({
  domain: '',
  tokenName: '',
  contractAddress: '',
  twitter: '',
  description: '',
  templateType: 'skyscraper'
})

export default function Page() {
  const params = useParams()

  console.log(params)
  const [formData] = useAtom(domainFormAtom)

  return (
    <main className="flex w-full h-[90vh]">
      <div className='w-full h-full md:w-3/12 border-r p-4'>
        <CreateTemplateForm domain={params.domain as string} />
      </div>

      <div className='hidden md:block md:w-9/12 h-full'>
        <TemplateBasic preview data={formData} />
      </div>
    </main>
  )
}