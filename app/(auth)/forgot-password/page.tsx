"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailSchema, forgotPasswordSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserByEmail, updatePassword } from "@/actions/auth.action";
import { sendOtp } from "@/actions/mail.action";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff, Loader } from "lucide-react";
import OtpForm from "@/components/forms/otp.form";
import { useRouter } from "next/navigation";

export default function ForgotPassPage() {
  const [step, setStep] = useState<"first" | "second" | "final">("first");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSendEmail = async (values: z.infer<typeof emailSchema>) => {
    setIsLoading(true);

    const user = await getUserByEmail(values.email.trim());
    if (user) {
      await sendOtp(values.email.trim());
      toast.success("Verification code sent to your email");
      setStep("second");
    } else {
      toast.error("You have not signed up yet, Please sign up first");
    }

    setIsLoading(false);
  };

  const onUpdatePassword = async (
    values: z.infer<typeof forgotPasswordSchema>,
  ) => {
    setIsLoading(true);
    const { status, message } = await updatePassword(
      emailForm.watch("email").trim(),
      values.confirmPassword.trim(),
    );

    if (status === 200) {
      toast.success(message);
      router.push("/sign-in");
    } else {
      toast.error(message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {step === "first" && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSendEmail)}
            className="space-y-3"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className={"mb-2"}>Email</Label>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={"w-full"} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className={"animate-spin"} />
                  <span>Loading...</span>
                </>
              ) : (
                "Send email"
              )}
            </Button>
          </form>
        </Form>
      )}
      {step === "second" && (
        <OtpForm
          email={emailForm.watch("email").trim()}
          isForgotPassword
          setStep={setStep}
        />
      )}
      {step === "final" && (
        <Form {...forgotPasswordForm}>
          <form
            onSubmit={forgotPasswordForm.handleSubmit(onUpdatePassword)}
            className={"space-y-3"}
          >
            <FormField
              control={forgotPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label className={"mb-2"}>New password</Label>
                  <div className={"flex items-center"}>
                    <FormControl>
                      <Input
                        type={isVisiblePassword ? "text" : "password"}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <Button
                      type={"button"}
                      size={"icon"}
                      variant={"outline"}
                      className={"size-12 bg-secondary"}
                      onClick={() => setIsVisiblePassword((prev) => !prev)}
                    >
                      {isVisiblePassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={forgotPasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label className={"mb-2"}>Confirm password</Label>
                  <div className={"flex items-center"}>
                    <FormControl>
                      <Input
                        type={isVisiblePassword ? "text" : "password"}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <Button
                      type={"button"}
                      size={"icon"}
                      variant={"outline"}
                      className={"size-12 bg-secondary"}
                      aria-label={"Toggle password"}
                      onClick={() => setIsVisiblePassword((prev) => !prev)}
                    >
                      {isVisiblePassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={"w-full"}
              disabled={isLoading}
              aria-label={"Submit"}
            >
              {isLoading ? (
                <>
                  <Loader className={"animate-spin"} />
                  <span>Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      )}
      <div className={"text-sm space-x-2"}>
        <span className={"text-muted-foreground"}>
          Don&apos;t have an account?
        </span>
        <Link href={"/sign-up"} className={"underline"}>
          Sign up
        </Link>
      </div>
    </>
  );
}
