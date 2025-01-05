"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const { login, isLoggingIn } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email }).then(() => router.push("/chat"));
  };

  return (
    <div className="py-16">
      <form
        onSubmit={handleSubmit}
        className="w-[800px] mx-auto flex flex-col items-center space-y-4"
      >
        <Input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
        <Button>Login</Button>
        {isLoggingIn && <Loader className="animate-spin" />}
      </form>
    </div>
  );
}
