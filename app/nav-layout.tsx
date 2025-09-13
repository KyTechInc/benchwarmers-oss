"use client";

import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/tw-ui/avatar";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/tw-ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
} from "@/components/tw-ui/sidebar";
import { StackedLayout } from "@/components/tw-ui/stacked-layout";
import { TeamLogo } from "@/components/ui/avatar";
import { Button, ButtonArrow } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { teams } from "@/lib/teams";

const navItems = [
  { label: "Stats", url: "/stats/players" },
  { label: "Standings", url: "/standings" },
  { label: "Transactions", url: "/transactions" },
  { label: "Schedules", url: "/boxscores" },
];

type FavoriteTeam = {
  team_code: string;
  team_name: string;
};

function TeamDropdownMenu({
  favoriteTeams,
}: {
  favoriteTeams: FavoriteTeam[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[300px] justify-between"
          role="combobox"
          variant="outline"
        >
          <span>Select a team...</span>
          <ButtonArrow />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search teams..." />
          <CommandList>
            <ScrollArea className="max-h-[300px]">
              <CommandEmpty>No teams found.</CommandEmpty>
              {favoriteTeams.length > 0 && (
                <CommandGroup heading="Favorites">
                  {favoriteTeams.map((team: FavoriteTeam) => (
                    <Link
                      href={`/teams/${team.team_code}`}
                      key={team.team_code}
                      onClick={() => setOpen(false)}
                      prefetch={false}
                    >
                      <CommandItem className="flex items-center gap-2">
                        <TeamLogo size="sm" teamCode={team.team_code} />
                        <span className="font-medium">{team.team_name}</span>
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              )}
              <CommandGroup heading="All Teams">
                {teams.map((team) => (
                  <Link
                    href={`/teams/${team.code}`}
                    key={team.id}
                    onClick={() => setOpen(false)}
                    prefetch={false}
                  >
                    <CommandItem className="flex items-center gap-2">
                      <TeamLogo size="sm" teamCode={team.code} />
                      <span className="font-medium">{team.name}</span>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function NavLayout({ children }: { children: React.ReactNode }) {
  const [favoriteTeams, setFavoriteTeams] = useState<FavoriteTeam[]>([]);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Mock favorite teams - TODO: add favorite teams from database / auth system
    const mockFavorites: FavoriteTeam[] = [
      { team_code: "BOS", team_name: "Boston Bruins" },
      { team_code: "TOR", team_name: "Toronto Maple Leafs" },
    ];
    setFavoriteTeams(mockFavorites);
  }, []);

  return (
    <StackedLayout
      navbar={
        <Navbar className="container mx-auto bg-card">
          <div className="flex items-center gap-3 max-lg:hidden">
            <Link href="/">
              <Avatar
                alt="Benchwarmer Logo"
                className="size-10 p-1.5"
                src={resolvedTheme === "dark" ? "/light.svg" : "/dark.svg"}
              />
            </Link>
            <TeamDropdownMenu favoriteTeams={favoriteTeams} />
          </div>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            {navItems.map(({ label, url }) => (
              <NavbarItem href={url} key={label}>
                {label}
              </NavbarItem>
            ))}
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar
                  className="size-8 rounded-full"
                  src="https://www.untitledui.com/images/avatars/harry-bender?w=150&h=150"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <a href="/my-profile">
                    <UserIcon />
                    <DropdownMenuLabel>My profile</DropdownMenuLabel>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/settings">
                    <Cog8ToothIcon />
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/privacy-policy">
                    <ShieldCheckIcon />
                    <DropdownMenuLabel>Privacy policy</DropdownMenuLabel>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/share-feedback">
                    <LightBulbIcon />
                    <DropdownMenuLabel>Share feedback</DropdownMenuLabel>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/logout">
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownMenuLabel>Sign out</DropdownMenuLabel>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3 lg:mb-2.5">
              <Avatar
                alt="Benchwarmer Logo"
                className="size-8"
                src={resolvedTheme === "dark" ? "/dark.svg" : "/light.svg"}
              />
              <TeamDropdownMenu favoriteTeams={favoriteTeams} />
            </div>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navItems.map(({ label, url }) => (
                <SidebarItem href={url} key={label}>
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </StackedLayout>
  );
}

export default NavLayout;
