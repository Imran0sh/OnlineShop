import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  console.log("Callback URL:", requestUrl.origin + requestUrl.pathname);
  console.log("Query parameters:", [...requestUrl.searchParams.keys()]);
  console.log("Referer:", request.headers.get("referer"));
  const code = requestUrl.searchParams.get("code");
  console.log("OAuth callback:", {
    hasCode: Boolean(code),
    error: requestUrl.searchParams.get("error"),
    errorCode: requestUrl.searchParams.get("error_code"),
    errorDescription: requestUrl.searchParams.get("error_description"),
  });
  const nextParam = requestUrl.searchParams.get("next") || "/";
  const next =
    nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/";

  if (!code) {
    console.error("OAuth callback: code отсутствует");

    console.error("OAuth error:", {
      error: requestUrl.searchParams.get("error"),
      description: requestUrl.searchParams.get("error_description"),
    });

    return redirect("/auth/auth-code-error");
  }

  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Ошибка авторизации:", error.message);
    return redirect("/auth/auth-code-error");
  }

  console.log("Пользователь:", {
    id: data.user?.id,
    email: data.user?.email,
  });

  return redirect(next);
};
