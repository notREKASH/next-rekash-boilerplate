"use client";

import { Form } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
});

export const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signIn("resend", { email: data.email, redirectTo: "/" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-center space-y-4">
        <Input
          className="ring-1 ring-primary/20"
          type="email"
          placeholder="Email"
          {...form.register("email")}
        />
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
};
