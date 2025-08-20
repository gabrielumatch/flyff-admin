import { ThemeProvider } from "@/components/theme-provider"
import SupabaseProvider from "@/components/supabase-provider"
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
        </body>
      </html>
    </>
  )
}