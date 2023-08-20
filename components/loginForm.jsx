"use client"

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are necessary!");
      return;
    }
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg rounded-lg p-5">
          <h1 className="text-xl font-bold my-4">LOGIN TO YOUR ACCOUNT</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="bg-black text-white px-6 py-2">Login</button>
            {error && (
              <div className="text-sm text-red-500 font-bold">{error}</div>
            )}
            <div className="text-sm text-right">
              Don't have an account yet?{" "}
              <Link className="underline" href={"/register"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}