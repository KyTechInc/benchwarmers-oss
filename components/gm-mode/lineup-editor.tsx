"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Kanban,
  KanbanColumn,
  KanbanColumnContent,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/ui/sortable";
import {
  TORONTO_ROSTER_DATA,
  type TorontoPlayerData,
} from "@/lib/mock-players";
import { type Team, teams } from "@/lib/teams";

type PlayerCardData = {
  id: string;
  name: string;
  position: "LW" | "C" | "RW" | "LD" | "RD" | "G";
  jersey: number;
  salary?: string;
  contract?: string;
  isPlaceholder?: boolean;
};

type RosterState = {
  // Forwards
  LW: PlayerCardData[];
  C: PlayerCardData[];
  RW: PlayerCardData[];
  // Defense
  LD: PlayerCardData[];
  RD: PlayerCardData[];
  G: PlayerCardData[];
  // Special sections
  PB: PlayerCardData[];
  IR: PlayerCardData[];
  LTIR: PlayerCardData[];
};

function getPlayerPosition(
  pos: TorontoPlayerData["pos"]
): "LW" | "C" | "RW" | "LD" | "RD" | "G" {
  if (pos === "G") {
    return "G";
  }
  if (pos === "D") {
    return "LD"; // Default to left defense, can be manually moved to RD
  }
  if (pos === "LW") {
    return "LW";
  }
  if (pos === "RW") {
    return "RW";
  }
  return "C"; // Default to center for other forwards
}

const JERSEY_FALLBACK = 1;
const PLAYER_ID_SLICE_LENGTH = -3;
const SALARY_DIVISOR = 1_000_000;

const MAX_FORWARD_LINES = 4;
const MAX_DEFENSE_PAIRS = 3;
const MAX_STARTING_GOALIES = 2; // 1 starter + 1 backup

// Helper function to create placeholder player slots
function createPlaceholderPlayer(
  id: string,
  position: PlayerCardData["position"]
): PlayerCardData {
  return {
    id,
    name: "",
    position,
    jersey: 0,
    salary: "",
    contract: "",
    isPlaceholder: true,
  };
}

// Helper function to get the required number of slots for each position
function getRequiredSlotsForPosition(position: keyof RosterState): number {
  switch (position) {
    case "LW":
    case "C":
    case "RW":
      return MAX_FORWARD_LINES; // 4
    case "LD":
    case "RD":
      return MAX_DEFENSE_PAIRS; // 4
    case "G":
      return MAX_STARTING_GOALIES; // 2
    default:
      return 0;
  }
}

// Helper function to ensure we have exactly N slots filled with players or placeholders
function fillSlotsWithPlaceholders(
  players: PlayerCardData[],
  maxSlots: number,
  position: PlayerCardData["position"]
): PlayerCardData[] {
  const filledSlots = players.slice(0, maxSlots);
  const placeholdersNeeded = maxSlots - filledSlots.length;

  const placeholders = Array.from({ length: placeholdersNeeded }, (_, index) =>
    createPlaceholderPlayer(
      `placeholder-${position}-${index + filledSlots.length}`,
      position
    )
  );

  return [...filledSlots, ...placeholders];
}

// Helper function to create additional placeholders when needed
function createAdditionalPlaceholders(
  position: PlayerCardData["position"],
  count: number
): PlayerCardData[] {
  return Array.from({ length: count }, (_, index) =>
    createPlaceholderPlayer(
      `placeholder-${position}-${Date.now()}-${index}`,
      position
    )
  );
}

// Helper function to process a single position's roster changes
function processPositionChanges(
  position: keyof RosterState,
  players: PlayerCardData[],
  processedRoster: RosterState
): void {
  const requiredSlots = getRequiredSlotsForPosition(position);
  const realPlayers = players.filter((p) => !p.isPlaceholder);
  const placeholders = players.filter((p) => p.isPlaceholder);

  if (realPlayers.length >= requiredSlots) {
    // Keep required amount, move extras to press box
    const keepers = realPlayers.slice(0, requiredSlots);
    const extras = realPlayers.slice(requiredSlots);

    processedRoster[position] = [
      ...keepers,
      ...placeholders.slice(0, requiredSlots - keepers.length),
    ];

    if (extras.length > 0) {
      if (!processedRoster.PB) {
        processedRoster.PB = [];
      }
      processedRoster.PB = [...processedRoster.PB, ...extras];
    }
  } else {
    // Fill with placeholders if needed
    const neededPlaceholders = requiredSlots - realPlayers.length;
    let availablePlaceholders = placeholders;

    if (availablePlaceholders.length < neededPlaceholders) {
      const additionalPlaceholders = createAdditionalPlaceholders(
        position as PlayerCardData["position"],
        neededPlaceholders - availablePlaceholders.length
      );
      availablePlaceholders = [
        ...availablePlaceholders,
        ...additionalPlaceholders,
      ];
    }

    processedRoster[position] = [
      ...realPlayers,
      ...availablePlaceholders.slice(0, neededPlaceholders),
    ];
  }
}

// Helper function to process roster changes and maintain slot requirements
function processRosterChanges(
  newRoster: Record<string, PlayerCardData[]>
): RosterState {
  const processedRoster = { ...newRoster } as RosterState;

  for (const positionKey of Object.keys(processedRoster)) {
    const position = positionKey as keyof RosterState;

    if (position === "PB" || position === "IR" || position === "LTIR") {
      continue;
    }

    const players = processedRoster[position];
    processPositionChanges(position, players, processedRoster);
  }

  return processedRoster;
}

function generateRosterFromData(team: Team): RosterState {
  if (team.code === "TOR") {
    // Use real Toronto roster data
    const torontoPlayers = TORONTO_ROSTER_DATA.filter(
      (player) => player.roster_status === "NHL"
    );

    const players: PlayerCardData[] = torontoPlayers.map((player) => ({
      id: player.player_id || player.id,
      name: player.player_name,
      position: getPlayerPosition(player.pos),
      jersey:
        Number.parseInt(player.player_id.slice(PLAYER_ID_SLICE_LENGTH), 10) ||
        JERSEY_FALLBACK,
      salary: `$${Math.round(Number.parseInt(player.aav, 10) / SALARY_DIVISOR)}M`,
      contract: `${player.yrs} yrs (${player.contract_end})`,
    }));

    // Separate players by position
    const leftWings = players.filter((p) => p.position === "LW");
    const centers = players.filter((p) => p.position === "C");
    const rightWings = players.filter((p) => p.position === "RW");
    const leftDefense = players.filter((p) => p.position === "LD");
    const rightDefense = players.filter((p) => p.position === "RD");
    const goalies = players.filter((p) => p.position === "G");

    // Take only the first N players for each position (rest go to press box)
    const pressBoxPlayers: PlayerCardData[] = [];

    // Forwards: Ensure exactly 4 slots each, rest to press box
    const lwForLines = fillSlotsWithPlaceholders(
      leftWings,
      MAX_FORWARD_LINES,
      "LW"
    );
    const cForLines = fillSlotsWithPlaceholders(
      centers,
      MAX_FORWARD_LINES,
      "C"
    );
    const rwForLines = fillSlotsWithPlaceholders(
      rightWings,
      MAX_FORWARD_LINES,
      "RW"
    );

    // Defense: Ensure exactly 4 slots each, rest to press box
    const ldForLines = fillSlotsWithPlaceholders(
      leftDefense,
      MAX_DEFENSE_PAIRS,
      "LD"
    );
    const rdForLines = fillSlotsWithPlaceholders(
      rightDefense,
      MAX_DEFENSE_PAIRS,
      "RD"
    );

    // Goalies: Ensure exactly 2 slots, rest to press box
    const gForLines = fillSlotsWithPlaceholders(
      goalies,
      MAX_STARTING_GOALIES,
      "G"
    );

    // Add remaining players to press box (only real players, not placeholders)
    pressBoxPlayers.push(
      ...leftWings.slice(MAX_FORWARD_LINES),
      ...centers.slice(MAX_FORWARD_LINES),
      ...rightWings.slice(MAX_FORWARD_LINES),
      ...leftDefense.slice(MAX_DEFENSE_PAIRS),
      ...rightDefense.slice(MAX_DEFENSE_PAIRS),
      ...goalies.slice(MAX_STARTING_GOALIES)
    );

    return {
      LW: lwForLines,
      C: cForLines,
      RW: rwForLines,
      LD: ldForLines,
      RD: rdForLines,
      G: gForLines,
      PB: pressBoxPlayers,
      IR: [], // Injured reserve - empty initially
      LTIR: [], // Long-term injured reserve - empty initially
    };
  }

  // For other teams, return rosters with placeholders
  return {
    LW: fillSlotsWithPlaceholders([], MAX_FORWARD_LINES, "LW"),
    C: fillSlotsWithPlaceholders([], MAX_FORWARD_LINES, "C"),
    RW: fillSlotsWithPlaceholders([], MAX_FORWARD_LINES, "RW"),
    LD: fillSlotsWithPlaceholders([], MAX_DEFENSE_PAIRS, "LD"),
    RD: fillSlotsWithPlaceholders([], MAX_DEFENSE_PAIRS, "RD"),
    G: fillSlotsWithPlaceholders([], MAX_STARTING_GOALIES, "G"),
    PB: [],
    IR: [],
    LTIR: [],
  };
}

const POSITION_LABEL: Record<string, string> = {
  LW: "Left Wing",
  C: "Center",
  RW: "Right Wing",
  LD: "Left Defense",
  RD: "Right Defense",
  G: "Goalie",
};

const SECTION_LABEL: Record<string, string> = {
  FORWARDS: "FORWARDS",
  DEFENSE: "DEFENSE",
  SPECIAL: "SPECIAL SECTIONS",
};

const COLUMN_LABEL: Record<string, string> = {
  LW: "Left Wing",
  C: "Center",
  RW: "Right Wing",
  LD: "Left Defense",
  RD: "Right Defense",
  G: "Goalie",
  PB: "Press Box",
  IR: "Injured Reserve",
  LTIR: "LTIR",
};

function PlayerCard({ player }: { player: PlayerCardData }) {
  const headshotBase = process.env.NEXT_PUBLIC_PLAYER_HEADSHOT || "";
  const HEADSHOT_SIZE = 64;

  // Format position with special indicators
  const getPositionDisplay = (position: PlayerCardData["position"]) => {
    const baseLabel = POSITION_LABEL[position];
    // Add special indicators like ↕ for versatility
    return `${baseLabel}`;
  };

  if (player.isPlaceholder) {
    return (
      <KanbanItemHandle asChild>
        <Card className="group relative border-2 border-blue-600/50 border-dashed transition-all hover:border-border hover:bg-muted/30">
          <CardContent className="flex items-center justify-center p-6">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Plus className="h-6 w-6 text-green-600/50" />
              <span className="font-medium text-xs">
                Add {getPositionDisplay(player.position)}
              </span>
            </div>
          </CardContent>
        </Card>
      </KanbanItemHandle>
    );
  }

  return (
    <KanbanItemHandle asChild>
      <Card className="group relative border border-border transition-shadow hover:cursor-grab hover:shadow-md active:cursor-grabbing">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <Image
              alt={player.name}
              className="size-12 rounded-full object-cover"
              height={HEADSHOT_SIZE}
              src={`${headshotBase}/${player.id}-headshot.webp`}
              width={HEADSHOT_SIZE}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate font-bold text-sm">{player.name}</div>
              <div className="text-muted-foreground text-xs">
                {player.jersey} • {getPositionDisplay(player.position)}
              </div>
              {player.salary && (
                <div className="font-medium text-green-600 text-sm">
                  {player.salary}
                </div>
              )}
              {player.contract && (
                <div className="text-muted-foreground text-xs">
                  {player.contract}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </KanbanItemHandle>
  );
}

export default function LineupEditor() {
  const [teamCode, setTeamCode] = useState<string>("TOR");
  const activeTeam = useMemo(
    () => teams.find((t) => t.code === teamCode) ?? teams[0],
    [teamCode]
  );

  const [roster, setRoster] = useState<RosterState>(() =>
    generateRosterFromData(activeTeam)
  );

  // When team changes, load roster data
  function handleTeamChange(value: string) {
    setTeamCode(value);
    const t = teams.find((x) => x.code === value);
    if (t) {
      setRoster(generateRosterFromData(t));
    }
  }

  function getItemId(item: PlayerCardData) {
    return item.id;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            alt={`${activeTeam.name} logo`}
            className="size-14 rounded-full bg-background object-contain"
            height={64}
            src={activeTeam.logo_light}
            width={64}
          />
          <div className="text-sm">
            <div className="font-medium leading-tight">{activeTeam.name}</div>
            <div className="text-muted-foreground">Code: {activeTeam.code}</div>
          </div>
        </div>
        <div className="w-56">
          <Select onValueChange={handleTeamChange} value={teamCode}>
            <SelectTrigger aria-label="Select team">
              <SelectValue aria-label={activeTeam.name}>
                {activeTeam.name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {teams.map((t) => (
                <SelectItem aria-label={t.name} key={t.code} value={t.code}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Single Kanban Context for Cross-Column Dragging */}
      <Kanban<PlayerCardData>
        className="space-y-4"
        getItemValue={getItemId}
        onValueChange={(newRoster: Record<string, PlayerCardData[]>) => {
          const processedRoster = processRosterChanges(newRoster);
          setRoster(processedRoster);
        }}
        value={roster}
      >
        {/* Main Roster Layout */}
        <div className="flex gap-6">
          {/* Main Roster - 80% width */}
          <div className="flex-1 space-y-6">
            {/* FORWARDS SECTION */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center font-bold text-lg">
                  {SECTION_LABEL.FORWARDS}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {(["LW", "C", "RW"] as const).map((position) => (
                    <KanbanColumn key={position} value={position}>
                      <div className="space-y-2">
                        <div className="border-border border-b pb-2 text-center font-semibold text-sm">
                          {COLUMN_LABEL[position]}
                        </div>
                        <div className="min-h-[400px] rounded-lg border border-border bg-muted/30 p-3">
                          <KanbanColumnContent
                            className="min-h-[200px] space-y-2"
                            value={position}
                          >
                            {roster[position].map((p) => (
                              <KanbanItem key={p.id} value={p.id}>
                                <PlayerCard player={p} />
                              </KanbanItem>
                            ))}
                          </KanbanColumnContent>
                        </div>
                      </div>
                    </KanbanColumn>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* DEFENSE SECTION */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center font-bold text-lg">
                  {SECTION_LABEL.DEFENSE}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {(["LD", "RD", "G"] as const).map((position) => (
                    <KanbanColumn key={position} value={position}>
                      <div className="space-y-2">
                        <div className="border-border border-b pb-2 text-center font-semibold text-sm">
                          {COLUMN_LABEL[position]}
                        </div>
                        <div className="min-h-[400px] rounded-lg border border-border bg-muted/30 p-3">
                          <KanbanColumnContent
                            className="min-h-[200px] space-y-2"
                            value={position}
                          >
                            {roster[position].map((p) => (
                              <KanbanItem key={p.id} value={p.id}>
                                <PlayerCard player={p} />
                              </KanbanItem>
                            ))}
                          </KanbanColumnContent>
                        </div>
                      </div>
                    </KanbanColumn>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Press Box - 20% width */}
          <div className="w-80 space-y-4">
            <Card className="h-full">
              <CardHeader>
                <div className="text-center">
                  <CardTitle className="font-bold text-lg">PRESS BOX</CardTitle>
                  <div className="mt-1 text-muted-foreground text-sm">
                    Drag players here to bench
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <KanbanColumn className="min-h-[600px]" key="PB" value="PB">
                  <div className="min-h-[600px] rounded-lg border border-border bg-muted/30 p-3">
                    <KanbanColumnContent
                      className="min-h-[200px] space-y-2"
                      value="PB"
                    >
                      {roster.PB.map((p) => (
                        <KanbanItem key={p.id} value={p.id}>
                          <PlayerCard player={p} />
                        </KanbanItem>
                      ))}
                    </KanbanColumnContent>
                  </div>
                </KanbanColumn>
              </CardContent>
            </Card>
          </div>
        </div>

        <KanbanOverlay className="z-50">
          {({ value, variant }) => (
            <div className="rounded-md border border-border bg-background p-2">
              <div className="text-muted-foreground text-xs">
                {variant === "item" ? "Moving Player" : "Moving Column"}
              </div>
              <div className="font-medium text-sm">{String(value)}</div>
            </div>
          )}
        </KanbanOverlay>
      </Kanban>
    </div>
  );
}
