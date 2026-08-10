import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ApolloProvider } from '@/shared/api/apollo/apollo-provider';
import { ThemeProvider } from '@/shared/providers/theme-provider';
import { Toaster } from '@/shared/ui/sonner';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CV Innowise',
  description: 'Curriculum Vitae management app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloProvider>{children}</ApolloProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
