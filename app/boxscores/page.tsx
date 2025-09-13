"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import MatchupCard from "@/components/boxscores/matchup-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

// Mock NHL game data for demonstration
const mockGames: NHLGame[] = [
  // Live games
  {
    id: "1",
    homeTeam: {
      code: "BOS",
      name: "Boston Bruins",
      record: "24-8-4",
      score: 3,
    },
    awayTeam: {
      code: "TOR",
      name: "Toronto Maple Leafs",
      record: "22-10-3",
      score: 2,
    },
    status: "live",
    period: 2,
    timeRemaining: "12:34",
    venue: "TD Garden",
    tvBroadcast: "TNT",
    gameDate: "2024-12-15",
  },
  {
    id: "2",
    homeTeam: {
      code: "EDM",
      name: "Edmonton Oilers",
      record: "26-6-2",
      score: 1,
    },
    awayTeam: {
      code: "COL",
      name: "Colorado Avalanche",
      record: "21-11-5",
      score: 4,
    },
    status: "live",
    period: 3,
    timeRemaining: "5:22",
    venue: "Rogers Place",
    tvBroadcast: "ESPN+",
    gameDate: "2024-12-15",
  },

  // Pre-game
  {
    id: "3",
    homeTeam: { code: "VGK", name: "Vegas Golden Knights", record: "23-9-3" },
    awayTeam: { code: "DAL", name: "Dallas Stars", record: "20-12-4" },
    status: "pre",
    startTime: "2024-12-15T19:00:00Z",
    venue: "T-Mobile Arena",
    tvBroadcast: "ABC",
    gameDate: "2024-12-15",
  },
  {
    id: "4",
    homeTeam: { code: "LAK", name: "Los Angeles Kings", record: "18-14-5" },
    awayTeam: { code: "ANA", name: "Anaheim Ducks", record: "15-17-3" },
    status: "pre",
    startTime: "2024-12-15T22:00:00Z",
    venue: "Crypto.com Arena",
    tvBroadcast: "NBC",
    gameDate: "2024-12-15",
  },

  // Post-game
  {
    id: "5",
    homeTeam: {
      code: "FLA",
      name: "Florida Panthers",
      record: "25-7-2",
      score: 5,
    },
    awayTeam: {
      code: "TBL",
      name: "Tampa Bay Lightning",
      record: "19-13-5",
      score: 2,
    },
    status: "post",
    venue: "Amerant Bank Arena",
    gameDate: "2024-12-15",
  },
  {
    id: "6",
    homeTeam: {
      code: "NYR",
      name: "New York Rangers",
      record: "22-10-4",
      score: 4,
    },
    awayTeam: {
      code: "PIT",
      name: "Pittsburgh Penguins",
      record: "16-15-6",
      score: 3,
    },
    status: "post",
    venue: "Madison Square Garden",
    gameDate: "2024-12-15",
  },
];

export default function BoxscoresPage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-12-15"));

  // Filter games by selected date
  const gamesForDate = useMemo(() => {
    const dateString = selectedDate.toISOString().split("T")[0];
    return mockGames.filter((game) => game.gameDate === dateString);
  }, [selectedDate]);

  // Group games by status
  const groupedGames = useMemo(() => {
    return gamesForDate.reduce(
      (acc, game) => {
        if (!acc[game.status]) {
          acc[game.status] = [];
        }
        acc[game.status].push(game);
        return acc;
      },
      {} as Record<GameStatus, NHLGame[]>
    );
  }, [gamesForDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-bold text-3xl">NHL Boxscores</h1>
          <Badge className="flex items-center gap-2" variant="outline">
            <Calendar className="h-4 w-4" />
            {formatDate(selectedDate)}
          </Badge>
        </div>

        {/* Date Navigation */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <Button
            className="flex items-center gap-2"
            onClick={() => navigateDate("prev")}
            size="sm"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Day
          </Button>

          <Button
            onClick={() => setSelectedDate(new Date())}
            size="sm"
            variant="outline"
          >
            Today
          </Button>

          <Button
            className="flex items-center gap-2"
            onClick={() => navigateDate("next")}
            size="sm"
            variant="outline"
          >
            Next Day
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Games Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Live Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl text-red-500">
                {groupedGames.live?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl text-blue-500">
                {groupedGames.pre?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl text-green-500">
                {groupedGames.post?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Game Sections */}
      <div className="space-y-12">
        {/* Live Games */}
        {groupedGames.live && groupedGames.live.length > 0 && (
          <div>
            <h2 className="mb-6 flex items-center gap-2 font-semibold text-2xl">
              <Badge className="animate-pulse" variant="destructive">
                LIVE
              </Badge>
              Games in Progress
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {groupedGames.live.map((game) => (
                <MatchupCard game={game} key={game.id} />
              ))}
            </div>
          </div>
        )}

        {/* Scheduled Games */}
        {groupedGames.pre && groupedGames.pre.length > 0 && (
          <div>
            <h2 className="mb-6 flex items-center gap-2 font-semibold text-2xl">
              <Badge variant="secondary">SCHEDULED</Badge>
              Upcoming Games
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {groupedGames.pre.map((game) => (
                <MatchupCard game={game} key={game.id} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Games */}
        {groupedGames.post && groupedGames.post.length > 0 && (
          <div>
            <h2 className="mb-6 flex items-center gap-2 font-semibold text-2xl">
              <Badge variant="outline">FINAL</Badge>
              Completed Games
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {groupedGames.post.map((game) => (
                <MatchupCard game={game} key={game.id} />
              ))}
            </div>
          </div>
        )}

        {/* No games message */}
        {gamesForDate.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-lg text-muted-foreground">
              No games scheduled for {formatDate(selectedDate)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
