import { UserRoundCog, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useProductStore } from "@/store";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error(error.message);
        return;
      }
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Ошибка выхода:", error.message);
      return;
    }

    setUser(null);
  };

  const handleSingIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Ошибка авторизации:", error.message);
    }
  };
  const cart = useProductStore((state) => state.cart);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <HoverCard>
      <HoverCardTrigger delay={100} closeDelay={200}>
        <button type="button">
          <UserRoundCog className="w-6 h-6" />
        </button>
      </HoverCardTrigger>

      <HoverCardContent className="w-max max-w-[90vw] p-3">
        {user ? (
          <>
            {/* Email + Avatar */}
            <div className="flex items-center gap-3 p-3 font-semibold border-b">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Аватар пользователя"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <UserRoundCog className="w-10 h-10" />
              )}

              <p className="whitespace-nowrap">{user.email}</p>
            </div>

            {/*Cart*/}
            <div className="flex items-center justify-between p-3 font-semibold border-b">
              <p>Корзина</p>
              <span className=" flex min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white font-medium">
                {cartCount}
              </span>
            </div>

            {/*LogOut*/}
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-md p-3
                         text-red-500 transition-colors
                         hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              Выйти из аккаунта
            </button>
          </>
        ) : (
          <button onClick={handleSingIn}>Войти через Google</button>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
