import { supabase } from "../lib/supabase.ts";

export async function signIn() {
  console.log("Starting Google OAuth");
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.log("Ошибка авторизации:", error.message);
  }
}
