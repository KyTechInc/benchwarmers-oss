"use client";

import { TeamLogo } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GameStatus = "pre" | "live" | "post";

type NHLGame = {
  id: string;
  homeTeam: {
    code: string;
    name: string;
    record: string;
    score?: number;
  };
  awayTeam: {
    code: string;
    name: string;
    record: string;
    score?: number;
  };
  status: GameStatus;
  startTime?: string;
  period?: number;
  timeRemaining?: string;
  venue: string;
  tvBroadcast?: string;
  gameDate: string;
};

type MatchupCardProps = {
  game: NHLGame;
};

function formatGameTime(timeString: string): string {
  const date = new Date(timeString);
  const today = new Date();

  // Check if game is today
  const isToday = date.toDateString() === today.toDateString();

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) {
    return `Today @ ${timeStr}`;
  }

  return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} @ ${timeStr}`;
}

function GameStatusBadge({
  status,
  isIntermission,
}: {
  status: GameStatus;
  isIntermission?: boolean;
}): React.ReactElement {
  const getStatusColor = () => {
    if (isIntermission) {
      return "blue";
    }
    switch (status) {
      case "live":
        return "red";
      case "pre":
        return "amber";
      case "post":
        return "lime";
      default:
        return "zinc";
    }
  };

  const isAnimated = isIntermission || ["live", "pre"].includes(status);

  const getStatusText = () => {
    if (isIntermission) {
      return "Intermission";
    }
    switch (status) {
      case "pre":
        return "Scheduled";
      case "live":
        return "LIVE";
      case "post":
        return "FINAL";
      default:
        return (status as string).toUpperCase();
    }
  };

  return (
    <Badge
      className={isAnimated ? "animate-pulse" : ""}
      variant={
        getStatusColor() === "red"
          ? "destructive"
          : getStatusColor() === "blue"
            ? "primary"
            : "secondary"
      }
    >
      {getStatusText()}
    </Badge>
  );
}

function GameScore({
  team,
  opponentScore,
  isHome,
}: {
  team: NHLGame["homeTeam"] | NHLGame["awayTeam"];
  opponentScore?: number;
  isHome: boolean;
}) {
  const isWinner = team.score && opponentScore && team.score > opponentScore;

  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-4 ${
        isWinner
          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
          : "bg-muted/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <TeamLogo size="md" teamCode={team.code} />
        <div>
          <div className="font-semibold text-sm">{team.name}</div>
          <div className="text-muted-foreground text-xs">{team.record}</div>
        </div>
      </div>
      <div className="text-right">
        <div
          className={`font-bold text-2xl ${isWinner ? "text-green-600 dark:text-green-400" : ""}`}
        >
          {team.score ?? "-"}
        </div>
        {isHome && <div className="text-muted-foreground text-xs">Home</div>}
      </div>
    </div>
  );
}

export default function MatchupCard({ game }: MatchupCardProps) {
  const gameTime = game.startTime ? formatGameTime(game.startTime) : null;

  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-lg">
            {game.awayTeam.code} @ {game.homeTeam.code}
          </CardTitle>
          {GameStatusBadge({
            status: game.status,
            isIntermission: game.period === 2,
          })}
        </div>
        <div className="text-muted-foreground text-sm">{game.venue}</div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Away Team */}
        <GameScore
          isHome={false}
          opponentScore={game.homeTeam.score}
          team={game.awayTeam}
        />

        {/* VS Divider */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span className="px-2 font-medium text-sm">VS</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        {/* Home Team */}
        <GameScore
          isHome={true}
          opponentScore={game.awayTeam.score}
          team={game.homeTeam}
        />

        {/* Game Details */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {game.status === "pre" && gameTime && (
              <>
                <div>
                  <span className="text-muted-foreground">Start Time:</span>
                  <div className="font-medium">{gameTime}</div>
                </div>
                {game.tvBroadcast && (
                  <div>
                    <span className="text-muted-foreground">TV:</span>
                    <div className="font-medium">{game.tvBroadcast}</div>
                  </div>
                )}
              </>
            )}

            {game.status === "live" && (
              <>
                <div>
                  <span className="text-muted-foreground">Period:</span>
                  <div className="font-medium">{game.period}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Time Left:</span>
                  <div className="font-medium">{game.timeRemaining}</div>
                </div>
              </>
            )}

            {game.status === "post" && (
              <>
                <div>
                  <span className="text-muted-foreground">Final Score:</span>
                  <div className="font-medium">
                    {game.awayTeam.score}-{game.homeTeam.score}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Winner:</span>
                  <div className="font-medium">
                    {(game.homeTeam.score ?? 0) > (game.awayTeam.score ?? 0)
                      ? game.homeTeam.name
                      : game.awayTeam.name}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
