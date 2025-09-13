"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TeamLogo } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardHeading,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

// Player data by category
const playerData = {
  UFAs: [
    {
      id: "1",
      name: "Roslovic, Jack",
      salary: 4_094_563,
      team: "CAR",
      position: "C",
      avatar: "jack-roslovic.png",
    },
    {
      id: "2",
      name: "Grzelcyk, Matt",
      salary: 3_770_948,
      team: "BOS",
      position: "D",
      avatar: "matt-grzelcyk.png",
    },
    {
      id: "3",
      name: "Kovalenko, Nikolai",
      salary: 2_002_562,
      team: "COL",
      position: "RW",
      avatar: "nikolai-kovalenko.png",
    },
    {
      id: "4",
      name: "Samsonov, Ilya",
      salary: 1_995_950,
      team: "TOR",
      position: "G",
      avatar: "ilya-samsonov.png",
    },
    {
      id: "5",
      name: "Georgiev, Alexandar",
      salary: 1_957_750,
      team: "COL",
      position: "G",
      avatar: "alexandar-georgiev.png",
    },
  ],
  RFAs: [
    {
      id: "6",
      name: "Tkachuk, Matthew",
      salary: 9_750_000,
      team: "FLA",
      position: "LW",
      avatar: "matthew-tkachuk.png",
    },
    {
      id: "7",
      name: "Point, Brayden",
      salary: 9_500_000,
      team: "TBL",
      position: "C",
      avatar: "brayden-point.png",
    },
    {
      id: "8",
      name: "Hedman, Victor",
      salary: 8_000_000,
      team: "TBL",
      position: "D",
      avatar: "victor-hedman.png",
    },
    {
      id: "9",
      name: "Rantanen, Mikko",
      salary: 9_500_000,
      team: "COL",
      position: "RW",
      avatar: "mikko-rantanen.png",
    },
    {
      id: "10",
      name: "Makaron, Connor",
      salary: 9_500_000,
      team: "COL",
      position: "D",
      avatar: "connor-makaron.png",
    },
  ],
  PTOs: [
    {
      id: "11",
      name: "Marner, Mitchell",
      salary: 10_625_000,
      team: "TOR",
      position: "RW",
      avatar: "mitchell-marner.png",
    },
    {
      id: "12",
      name: "Rielly, Morgan",
      salary: 7_500_000,
      team: "TOR",
      position: "D",
      avatar: "morgan-rielly.png",
    },
    {
      id: "13",
      name: "Matthews, Auston",
      salary: 11_640_250,
      team: "TOR",
      position: "C",
      avatar: "auston-matthews.png",
    },
    {
      id: "14",
      name: "McDavid, Connor",
      salary: 12_500_000,
      team: "EDM",
      position: "C",
      avatar: "connor-mcdavid.png",
    },
    {
      id: "15",
      name: "Draisaitl, Leon",
      salary: 8_500_000,
      team: "EDM",
      position: "C",
      avatar: "leon-draisaitl.png",
    },
  ],
  Buyouts: [
    {
      id: "16",
      name: "Ovechkin, Alex",
      salary: 9_538_462,
      team: "WSH",
      position: "LW",
      avatar: "alex-ovechkin.png",
    },
    {
      id: "17",
      name: "Backstrom, Nicklas",
      salary: 6_000_000,
      team: "WSH",
      position: "C",
      avatar: "nicklas-backstrom.png",
    },
    {
      id: "18",
      name: "Kuznetsov, Evgeny",
      salary: 7_882_353,
      team: "WSH",
      position: "C",
      avatar: "evgeny-kuznetsov.png",
    },
    {
      id: "19",
      name: "Wilson, Tom",
      salary: 5_500_000,
      team: "WSH",
      position: "RW",
      avatar: "tom-wilson.png",
    },
    {
      id: "20",
      name: "Carlson, John",
      salary: 8_000_000,
      team: "WSH",
      position: "D",
      avatar: "john-carlson.png",
    },
  ],
};

type PlayerListProps = {
  category: keyof typeof playerData;
};

const MAX_PLAYERS_DISPLAYED = 5;

const getBadgeVariant = (category: keyof typeof playerData) => {
  switch (category) {
    case "UFAs":
      return "success";
    case "RFAs":
      return "info";
    case "PTOs":
      return "warning";
    case "Buyouts":
      return "destructive";
    default:
      return "success";
  }
};

export default function PlayerList({ category }: PlayerListProps) {
  const players = playerData[category];
  const totalCount = players.length;

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <Card className="h-full w-[400px]">
      <CardHeader>
        <CardHeading>
          <CardTitle>
            <Badge appearance="outline" variant={getBadgeVariant(category)}>
              {category}
            </Badge>
          </CardTitle>
        </CardHeading>
        <CardToolbar>
          <div className="text-muted-foreground text-sm">
            {totalCount} total
          </div>
          <Link
            className="flex items-center gap-1 text-muted-foreground text-sm"
            href="#"
          >
            See All
            <ChevronRight />
          </Link>
        </CardToolbar>
      </CardHeader>
      <CardContent className="py-1">
        {players.slice(0, MAX_PLAYERS_DISPLAYED).map((player) => {
          return (
            <ScrollArea className="h-[65px] pe-3.5" key={player.id}>
              <div
                className="flex items-center justify-between gap-2 border-b border-dashed py-2 last:border-none"
                key={player.id}
              >
                {/* Left: Team Logo and Player Info */}
                <div className="flex items-center gap-3">
                  <TeamLogo size="md" teamCode={player.team} />
                  <div>
                    <Link
                      className="font-medium text-foreground text-sm hover:text-primary"
                      href="#"
                    >
                      {player.name}
                    </Link>
                    <div className="font-normal text-muted-foreground text-sm">
                      {player.team} • {player.position}
                    </div>
                  </div>
                </div>
                {/* Right: Projected Salary */}
                <div className="text-right">
                  <div className="font-medium text-foreground text-sm">
                    {formatSalary(player.salary)}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Projected $
                  </div>
                </div>
              </div>
            </ScrollArea>
          );
        })}
      </CardContent>
    </Card>
  );
}
