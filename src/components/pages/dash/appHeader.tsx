import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function AppHeader() {
  return (
    <header className="w-full sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-sidebar border-b border-border">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
      </div>
      <Button variant="outline" size="sm" onClick={() => signOut()}>
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </header>
  );
}
