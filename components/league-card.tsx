import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LeagueCard() {
  const capAlerts = [
    {
      team: "San Jose Sharks",
      capSpace: -2.4,
      status: "over",
      daysLeft: 15,
      tradeUrl: "#",
    },
    {
      team: "Anaheim Ducks",
      capSpace: -1.8,
      status: "over",
      daysLeft: 22,
      tradeUrl: "#",
    },
    {
      team: "Chicago Blackhawks",
      capSpace: 0.5,
      status: "close",
      daysLeft: 30,
      tradeUrl: "#",
    },
  ];

  return (
    <Card className="w-full md:w-[450px]">
      <CardHeader className="border-0 py-6">
        <CardTitle>NHL League Cap Overview</CardTitle>
        <CardToolbar>
          <Select defaultValue="current-season">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-season">2024-25 Season</SelectItem>
              <SelectItem value="last-season">2023-24 Season</SelectItem>
              <SelectItem value="next-season">2025-26 Season</SelectItem>
            </SelectContent>
          </Select>
        </CardToolbar>
      </CardHeader>
      <CardContent>
        {/* Stats Row */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              League Cap Space
            </div>
            <div className="font-bold text-2xl text-foreground">$87.2M</div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Teams Under Cap
            </div>
            <div className="font-bold text-2xl text-foreground">18/32</div>
          </div>
        </div>
        {/* Segmented Progress Bar */}
        <div className="mb-3.5 flex h-2.5 w-full items-center gap-0.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-teal-400" style={{ width: "60%" }} />
          <div className="h-full bg-destructive" style={{ width: "30%" }} />
          <div className="h-full bg-amber-400" style={{ width: "10%" }} />
        </div>
        {/* Legend */}
        <div className="mb-6 flex items-center gap-5">
          <div className="flex items-center gap-1 text-teal-600 text-xs">
            <span className="inline-block size-2 rounded-full bg-teal-400" />{" "}
            Under Cap
          </div>
          <div className="flex items-center gap-1 text-destructive text-xs">
            <span className="inline-block size-2 rounded-full bg-destructive" />{" "}
            Over Cap
          </div>
          <div className="flex items-center gap-1 text-amber-600 text-xs">
            <span className="inline-block size-2 rounded-full bg-amber-400" />{" "}
            Near Cap
            <span className="ms-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="size-3.5 cursor-pointer text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>
                      Teams within $2M of the salary cap need careful
                      management.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        </div>
        {/* Cap Alerts List */}
        <div className="mb-2.5 flex items-center justify-between">
          <div className="text-muted-foreground text-xs uppercase tracking-wide">
            Cap Alerts
          </div>
          <a
            className="font-medium text-primary text-sm hover:underline"
            href="/teams"
          >
            View all teams
          </a>
        </div>
        {capAlerts.map((item) => (
          <div
            className="mb-2 flex items-center justify-between rounded-md bg-muted/40 px-3 py-2.5 last:mb-0"
            key={item.team}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-medium text-foreground text-sm">
                {item.team}
              </span>
              <Badge
                className={
                  item.capSpace < 0
                    ? "border-destructive text-destructive"
                    : "border-amber-600 text-amber-600"
                }
                size="sm"
                variant="outline"
              >
                {item.capSpace < 0 ? "Over Cap" : "Near Cap"}
              </Badge>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-muted-foreground text-xs">
                <span
                  className={`font-semibold ${item.capSpace < 0 ? "text-destructive" : "text-amber-600"}`}
                >
                  {item.capSpace < 0
                    ? `$${Math.abs(item.capSpace)}M over`
                    : `$${item.capSpace}M left`}
                </span>
              </span>
              <Separator
                className="h-3 bg-accent-foreground/20"
                orientation="vertical"
              />
              <a
                className="font-medium text-primary text-xs hover:underline"
                href={item.tradeUrl}
              >
                Trade
              </a>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
