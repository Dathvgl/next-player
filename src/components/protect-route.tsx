"use client";

import { Terminal } from "lucide-react";
import { useAuth } from "~/contexts/auth-context";
import { ChildReact } from "~/types/type";

export function AuthProtectRoute({ children }: ChildReact) {
  const authContext = useAuth();

  if (authContext?.user) return <>{children}</>;
  else {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-65px)]">
        <div className="flex items-center gap-2 rounded-md border px-3 py-2 font-bold text-stone-100 dark:text-stone-300 bg-red-500 dark:bg-red-700">
          <Terminal className="h-4 w-4" />
          <span>Yêu cầu đăng nhập</span>
        </div>
      </div>
    );
  }
}
