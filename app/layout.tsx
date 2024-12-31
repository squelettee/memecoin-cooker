import './globals.css';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from '@/components/mode-toggle';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="flex justify-between items-center h-[10vh] border-b p-10">
              <h1 className="text-3xl font-bold">Meme Cooker</h1>
              <ModeToggle />
            </nav>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
