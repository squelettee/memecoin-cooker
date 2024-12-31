'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormDescription, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { domainFormSchema, DomainFormValues } from "../../app/validations/domain-only-schema";
import { useRouter } from "next/navigation";
import { checkDomainAvailability } from "@/app/services/domain-service";

export function DomainForm() {
  const form = useForm<DomainFormValues>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: {
      domain: ""
    }
  });

  const router = useRouter();

  const onSubmit = async (values: DomainFormValues) => {
    const isAvailable = await checkDomainAvailability(values.domain);

    if (isAvailable) {
      router.push(`/create/${values.domain}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de Domaine</FormLabel>
              <FormControl>
                <Input type="text" id="domain" placeholder="votre site" {...field} />
              </FormControl>
              <span>.meme-cooker.fun</span>
              <FormDescription>Entrez le nom de domaine de votre site.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Suivant</Button>
      </form>
    </Form>
  );
} 