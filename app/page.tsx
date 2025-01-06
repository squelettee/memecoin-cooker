'use client';

import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import Navbar from "@/components/navbar";
import { CreateDomainForm } from "../components/forms/create-domain";


export default function Home() {


  return (
    <main className="w-[100vw] h-[140vh] bg-background flex flex-col">
      <Navbar />

      <div className="h-full w-full flex flex-col items-center justify-around">
        <div className="flex flex-col items-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Create, personalize, and launch
            your ultimate memecoin
          </h1>
          <CreateDomainForm />
        </div>

        <VelocityScroll>
          latest release -
        </VelocityScroll>

        <div className="flex flex-col items-center">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Support the project
          </h2>
          <div className="flex gap-4 mt-4">
            <button
              onClick={async () => {
                try {
                  const response = await fetch('https://api.commerce.coinbase.com/charges/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CC-Api-Key': process.env.NEXT_PUBLIC_COINBASE_API_KEY || ''
                    },
                    body: JSON.stringify({
                      name: "Memecoin Generator Donation",
                      description: "Support the development of the memecoin generator",
                      pricing_type: "fixed_price",
                      local_price: {
                        amount: "1.00",
                        currency: "EUR"
                      }
                    })
                  });
                  const data = await response.json();
                  // Redirect to Coinbase Commerce hosted page
                  window.location.href = data.data.hosted_url;
                } catch (error) {
                  console.error('Error creating charge:', error);
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Donate $1
            </button>
          </div>
        </div>


      </div>
    </main >
  );
}


