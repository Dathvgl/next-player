import ThemeProvider from "~/app/components/theme-provider";
import { ReduxProvider } from "~/redux/provider";
import { ChildReact } from "~/types/type";
import AuthProvider from "./auth-provider";

export default function HandleProvider({ children }: ChildReact) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ReduxProvider>
          <AuthProvider />
          <>{children}</>
        </ReduxProvider>
      </ThemeProvider>
    </>
  );
}
