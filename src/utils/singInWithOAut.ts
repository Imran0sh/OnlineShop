import { supabase } from "../lib/supabase.ts";

export async function signIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:4321/auth/callback`,
    },
  });

  if (error) {
    console.log("logIn:", error);
  }
}
