import { TwitterIcon } from "lucide-react";

interface TemplateProps {
  data: {
    domain: string;
    tokenName: string;
    contractAddress: string;
    twitter: string;
    description: string;
  }
}
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export function TemplateBasic({ data }: TemplateProps) {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <Card className="p-6 mx-auto bg-red">
        <CardHeader>
          <CardTitle>{data.tokenName || 'Nom du token'}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{data.description || 'Description du coin'}</CardDescription>
          <p className="mt-2">{data.contractAddress || 'Adresse du contrat'}</p>
          <Link
            href={`https://twitter.com/${data.twitter || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center text-blue-500 hover:underline"
          >
            {`@${data.twitter}` || 'Twitter'}
            <TwitterIcon className="ml-2" />
          </Link>
        </CardContent>
      </Card>

      <footer className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Retour à laccueil
        </Link>
      </footer>

    </div>
  )
}