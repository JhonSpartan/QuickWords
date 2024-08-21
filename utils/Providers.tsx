"use client"

import { QueryClient, QueryClientProvider } from 'react-query';

export default function Providers({ children }: {children: React.ReactNode}) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    }
  })

  return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
  )
}

