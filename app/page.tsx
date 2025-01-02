'use client';

import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import Navbar from "@/components/navbar";
import { CreateDomainForm } from "../components/forms/create-domain";
// import { TemplateService } from "@/services/template-service";
// import { Suspense } from "react";
// import { use } from "react";


// function DisplayLatestTemplates({ data }: { data: Promise<unknown> }) {
//   const resolvedData = use(data);

//   console.log(resolvedData);
//   return (
//     <div>display</div>
//   )
// }


export default function Home() {

  // const latestsTemplate = TemplateService.getLatestTemplates();

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

        {/* <Suspense fallback={<div>... loading</div>}>
          <DisplayLatestTemplates data={latestsTemplate} />
        </Suspense> */}
        <p>dd</p>
      </div>
    </main >
  );
}


