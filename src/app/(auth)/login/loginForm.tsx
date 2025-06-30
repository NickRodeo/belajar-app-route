"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl,
      });
      if (!res!.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else setError("Email or Password is incorrect");
    } catch (err) {
      setError("Email or Password is incorrect");
    }
    setIsLoading(false);
  }

  return (
    <div className="bg-slate-200 border-1 rounded-lg border-indigo-600 w-[90%] lg:w-[70%] mt-[50px] mx-auto">
      {error && (
        <h1 className="my-5 text-red-600 font-medium text-xl text-center">
          {error}
        </h1>
      )}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white"
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white"
                onClick={() =>
                  signIn("google", { callbackUrl, redirect: false })
                }
              >
                Sign in with Google
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
