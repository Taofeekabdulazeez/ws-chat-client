"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [id, setId] = useState("");
  const { login, isLoggingIn } = useAuthStore();
  const router = useRouter();
  return (
    <div>
      <input onChange={(event) => setId(event.target.value)} type="number" />
      <Button onClick={() => login({ id }).then(() => router.push("/chat"))}>
        Login
      </Button>
      {isLoggingIn && <Loader className="animate-spin" />}
    </div>
  );
}
