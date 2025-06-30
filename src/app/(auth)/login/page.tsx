import { Suspense } from "react";
import LoginForm from "./loginForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
}
