import { Template } from '@/components/_templates/template'
import { TemplateService } from "@/services/template-service"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const data = await TemplateService.getTemplate((await params).slug)

  return (
    <main>
      <Template data={data} />
    </main>
  )
}