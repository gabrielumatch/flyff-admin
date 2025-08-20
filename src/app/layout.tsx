import { ThemeProvider } from "@/components/theme-provider"
import SupabaseProvider from "@/components/supabase-provider"
import { Toaster } from "@/components/ui/sonner"
import { ReactNode } from "react"
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
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
            <SupabaseProvider>
              {children}
            </SupabaseProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}