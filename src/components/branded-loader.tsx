import { Logo } from "@/components/logo";

export function BrandedLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <Logo className="h-16 w-16 text-primary" />
        </div>
        <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">MindFiti</span>
        </div>
        <p className="text-sm text-muted-foreground">Loading your wellness journey...</p>
      </div>
    </div>
  );
}
