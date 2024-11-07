import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="relative z-50 flex h-full items-center justify-center p-4 sm:min-h-[calc(100dvh-6.5rem)]">
      <Card className="w-full max-w-md rounded-xl bg-primary/10 p-8 shadow-2xl backdrop-blur-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary">
            <Mail className="size-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-sm text-foreground">
            Click the link in the email to confirm your address and continue the
            process.
          </p>
          <div className="text-sm text-muted-foreground">
            If you don&apos;t receive the email, check your spam folder or click
            below to resend it.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="default"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            asChild>
            <Link href="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 size-4" />
              Back to home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
