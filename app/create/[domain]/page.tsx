'use client'

import { useParams } from 'next/navigation'
import { CreateTemplateForm } from '@/components/forms/create-template'

export default function Page() {
  const params = useParams()

  return (
    <main className="flex w-full h-[90vh]">
      <CreateTemplateForm domain={params.domain as string} />
    </main>
  )
}