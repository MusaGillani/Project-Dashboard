"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import * as React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string({ required_error: "please enter a username" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "password too short" })
    .max(20, { message: "password too long" }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isSignUpMode, setMode] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [parent] = useAutoAnimate({
    easing: "linear",
    duration: 350,
  });
  const router = useRouter()
  const supabase = createClientComponentClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password, username } = data;
    setIsLoading(true);
    if (isSignUpMode) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            username
          }
        },
      });
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    }
    setIsLoading(false);
    router.refresh()
  }

  return (
    <>
      <Toggle
        pressed={isSignUpMode}
        onPressedChange={() => {
          setMode((prev) => !prev);
        }}
        className={cn(
          toggleVariants({ variant: "outline" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        SignUp
      </Toggle>
      <div className="lg:p-8">
        <div className="mx-auto flex w-4/5 flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center" ref={parent}>
            {isSignUpMode ? (
              <h1
                className="text-2xl font-semibold tracking-tight"
                key="Signup-heading"
              >
                Create an account
              </h1>
            ) : (
              <h1
                className="text-2xl font-semibold tracking-tight"
                key="login-heading"
              >
                Login
              </h1>
            )}
            {isSignUpMode ? (
              <p className="text-muted-foreground text-sm" key="signUp-text">
                Enter the details below to create your account
              </p>
            ) : (
              <p className="text-muted-foreground text-sm" key="login-text">
                Enter your credentials to Login
              </p>
            )}
          </div>
          <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2" ref={parent}>
                  {isSignUpMode && (
                    <div className="grid gap-1" key="username">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="username"
                                type="username"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="ml-3">
                              Your Display Name
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  <div className="grid gap-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="name@example.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="ml-3">
                            Email ID for login
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-1">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="password"
                              type="password"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="ml-3">
                            Should be 6 characters minimum
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSignUpMode ? "Sign Up" : "Login with Email"}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground bg-black px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}{" "}
              Github
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
