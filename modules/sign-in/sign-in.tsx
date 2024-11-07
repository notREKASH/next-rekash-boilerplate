import { OAuth } from "@modules/sign-in/components/oauth/oauth";
import { SignInForm } from "@modules/sign-in/form/sign-in-form";

export const SignIn = () => {
  return (
    <div className="relative z-50 flex h-full items-center justify-center p-4 sm:min-h-[calc(100dvh-6.5rem)]">
      <div className="w-full max-w-md rounded-xl bg-primary/10 p-8 shadow-2xl backdrop-blur-lg">
        <h2 className="mb-6 text-center text-4xl font-bold text-primary">
          Sign In
        </h2>
        <SignInForm />
        <div className="mt-8">
          <p className="mb-4 text-center text-primary">Or sign in with</p>
          <OAuth />
        </div>
      </div>
    </div>
  );
};
