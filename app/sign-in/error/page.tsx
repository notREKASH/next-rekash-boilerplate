import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SignInErrorPage() {
  return (
    <div className="relative z-50 flex h-full items-center justify-center p-4 sm:min-h-[calc(100dvh-6.5rem)]">
      <Card className="flex w-full max-w-md flex-col items-center justify-center gap-8 rounded-xl bg-primary/10 p-8 text-center shadow-2xl backdrop-blur-lg">
        <div className="space-y-4">
          <div className="relative mx-auto size-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle className="size-16 text-red-500" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-primary">
            Connection error
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-xl text-foreground">
            Impossible to connect to your account.
          </p>
          <p className="text-foreground">
            Please check your information and try again.
          </p>
        </div>
        <div className="space-y-4">
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            size="lg"
            asChild>
            <Link href="/sign-in">Try again</Link>
          </Button>
          <p className="text-sm text-foreground">
            Need help?{" "}
            <Link href="/support" className="text-blue-400 hover:text-blue-300">
              Contact support
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
