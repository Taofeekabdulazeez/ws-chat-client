import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [email, setEmail] = useState("taofeek@gmail.com");
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email }).then(() => navigate("/chat"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email to log in or create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                id="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader className="animate-spin" />
              ) : (
                "Continue with email"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
