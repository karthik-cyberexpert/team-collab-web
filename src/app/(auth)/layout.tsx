export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
       {/* Ambient Background Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 dark:opacity-40 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/40 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
       </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Welcome to Antigravity
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
           Your gateway to the future of collaboration.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border/50 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
