"use client";

import { Logo } from "@/components/layout/header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  adminLinks,
  parentLinks,
  studentLinks,
  teacherLinks,
} from "@/lib/static";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r" {...props}>
      <SidebarHeader className="border-b px-3 py-2">
        <Logo showText={open} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentByRole />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <UserSection />
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarContentByRole() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  if (status === "loading") {
    return (
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="space-y-2 px-2 pt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-md" />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    );
  }

  if (!userId) {
    return null;
  }

  let links;
  switch (session?.user?.role) {
    case "ADMIN":
      links = adminLinks;
      break;
    case "TEACHER":
      links = teacherLinks;
      break;
    case "STUDENT":
      links = studentLinks;
      break;
    case "PARENT":
      links = parentLinks;
      break;
    default:
      links = null;
  }
  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {links?.map((item) => {
              const href = `/${userId}${item.url}`;
              const isActive =
                item.url === "/"
                  ? pathname === `/${userId}` // dashboard exact
                  : pathname.startsWith(href); // any sub-route under this section

              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm",
                      "transition-colors duration-150",
                      "data-[active=true]:bg-blue-600/70 data-[active=true]:text-white",
                      "hover:bg-blue-600/95 hover:text-white"
                    )}
                  >
                    <Link href={href}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}

function UserSection() {
  const { open } = useSidebar();
  const { data: session } = useSession();

  const name = session?.user?.name ?? "John Doe";
  const email = session?.user?.email ?? "john@example.com";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="flex w-full items-center gap-2 rounded-md py-2 hover:bg-muted">
          <Avatar className="h-8 w-8 flex items-center justify-between p-0">
            <AvatarImage src={session?.user?.image ?? "/avatar.jpg"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "flex min-w-0 flex-col text-left transition-opacity",
              !open && "hidden"
            )}
          >
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
