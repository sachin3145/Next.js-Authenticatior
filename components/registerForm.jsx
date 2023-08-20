"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e){
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are necessary!");
      return;
    }
    try {
      const userRes = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        }),
      });
      const {user} = await userRes.json();
      if (user) {
        setError("User Already Exists");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      }
      else {
        console.log("User Registration Failed");
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  }

    return (
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg rounded-lg p-5">
          <h1 className="text-xl font-bold my-4">CREATE AN ACCOUNT</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
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
            <button className="bg-black text-white px-6 py-2">Register</button>
            {error && (
              <div className="text-sm text-red-500 font-bold">{error}</div>
            )}
            <div className="text-sm text-right">
              Already Have an Account?{" "}
              <Link className="underline" href={"/"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}