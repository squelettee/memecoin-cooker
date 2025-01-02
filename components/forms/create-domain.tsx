'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { domainNameSchema, type DomainNameFormValues } from "../../validations/domain-name-schema";
import { useRouter } from "next/navigation";
import { checkDomainAvailability } from "@/services/domain-service";

export function CreateDomainForm() {
  const form = useForm<DomainNameFormValues>({
    resolver: zodResolver(domainNameSchema),
    defaultValues: {
      domainName: ""
    }
  });

  const router = useRouter();

  const onSubmit = async (values: DomainNameFormValues) => {

    try {
      const isAvailable = await checkDomainAvailability(values.domainName);

      if (isAvailable) {
        router.push(`/create/${values.domainName}`);
      } else {
        form.setError("domainName", {
          type: "manual",
          message: "This domain name is already taken"
        });
      }
    } catch {
      form.setError("domainName", {
        type: "manual",
        message: "An error occurred while checking the domain"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 h-36 flex flex-col justify-around">
        <FormField
          control={form.control}
          name="domainName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    id="domainName"
                    placeholder="your site"
                    className="pr-32"
                    {...field}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                    .meme-cooker.fun
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full py-4 text-lg font-bold" type="submit">I create mine</Button>
      </form>
    </Form>
  );
} 