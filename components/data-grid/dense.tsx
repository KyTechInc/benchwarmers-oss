"use client";

import {
  type ColumnDef,
  type ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { SquareMinus, SquarePlus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TeamLogo } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// NHL salary cap constants
const NHL_SALARY_CAP = 88_000_000;
const PERCENTAGE_MULTIPLIER = 100;
const TOP_PLAYERS_LIMIT = 5;

// Generate mock players for a team (top 5 highest paid)
const generateMockPlayers = (teamCode: string): PlayerData[] => {
  const mockPlayers: Record<string, PlayerData[]> = {
    FLA: [
      {
        id: "fla-1",
        name: "Barkov, Aleksander",
        position: "C",
        contractYears: 5,
        contractType: "UFA",
        status: "NMC",
        acquired: "Draft",
        age: 30,
        capPercentage: 10.5,
        salary2025: 10_000_000,
        salary2026: 10_000_000,
        salary2027: 10_000_000,
        salary2028: 10_000_000,
        salary2029: 10_000_000,
        salary2030: 0,
        contractEnd: "UFA",
      },
      {
        id: "fla-2",
        name: "Tkachuk, Matthew",
        position: "LW",
        contractYears: 5,
        contractType: "UFA",
        status: "NMC",
        acquired: "Trade",
        age: 27,
        capPercentage: 9.9,
        salary2025: 9_500_000,
        salary2026: 9_500_000,
        salary2027: 9_500_000,
        salary2028: 9_500_000,
        salary2029: 9_500_000,
        salary2030: 0,
        contractEnd: "UFA",
      },
      {
        id: "fla-3",
        name: "Reinhart, Sam",
        position: "RW",
        contractYears: 7,
        contractType: "UFA",
        status: "NMC",
        acquired: "Trade",
        age: 29,
        capPercentage: 9.0,
        salary2025: 8_625_000,
        salary2026: 8_625_000,
        salary2027: 8_625_000,
        salary2028: 8_625_000,
        salary2029: 8_625_000,
        salary2030: 8_625_000,
        contractEnd: "UFA",
      },
      {
        id: "fla-4",
        name: "Bennett, Sam",
        position: "C",
        contractYears: 8,
        contractType: "UFA",
        status: "NMC",
        acquired: "Trade",
        age: 29,
        capPercentage: 8.4,
        salary2025: 8_000_000,
        salary2026: 8_000_000,
        salary2027: 8_000_000,
        salary2028: 8_000_000,
        salary2029: 8_000_000,
        salary2030: 8_000_000,
        contractEnd: "UFA",
      },
      {
        id: "fla-5",
        name: "Verhaeghe, Carter",
        position: "LW",
        contractYears: 8,
        contractType: "UFA",
        status: "NMC",
        acquired: "Signed",
        age: 30,
        capPercentage: 7.3,
        salary2025: 7_000_000,
        salary2026: 7_000_000,
        salary2027: 7_000_000,
        salary2028: 7_000_000,
        salary2029: 7_000_000,
        salary2030: 7_000_000,
        contractEnd: "UFA",
      },
    ],
    TOR: [
      {
        id: "tor-1",
        name: "Matthews, Auston",
        position: "C",
        contractYears: 5,
        contractType: "UFA",
        status: "NMC",
        acquired: "Draft",
        age: 27,
        capPercentage: 13.3,
        salary2025: 13_400_000,
        salary2026: 13_400_000,
        salary2027: 13_400_000,
        salary2028: 13_400_000,
        salary2029: 13_400_000,
        salary2030: 0,
        contractEnd: "UFA",
      },
      {
        id: "tor-2",
        name: "Marner, Mitchell",
        position: "RW",
        contractYears: 6,
        contractType: "UFA",
        status: "NMC",
        acquired: "Draft",
        age: 28,
        capPercentage: 12.0,
        salary2025: 11_375_000,
        salary2026: 11_375_000,
        salary2027: 11_375_000,
        salary2028: 11_375_000,
        salary2029: 11_375_000,
        salary2030: 11_375_000,
        contractEnd: "UFA",
      },
      {
        id: "tor-3",
        name: "Rielly, Morgan",
        position: "D",
        contractYears: 8,
        contractType: "UFA",
        status: "NMC",
        acquired: "Draft",
        age: 31,
        capPercentage: 7.5,
        salary2025: 7_500_000,
        salary2026: 7_500_000,
        salary2027: 7_500_000,
        salary2028: 7_500_000,
        salary2029: 7_500_000,
        salary2030: 7_500_000,
        contractEnd: "UFA",
      },
    ],
    BOS: [
      {
        id: "bos-1",
        name: "Rask, Tuukka",
        position: "G",
        contractYears: 4,
        contractType: "UFA",
        status: "NTC",
        acquired: "Signed",
        age: 38,
        capPercentage: 5.0,
        salary2025: 4_000_000,
        salary2026: 4_000_000,
        salary2027: 4_000_000,
        salary2028: 0,
        salary2029: 0,
        salary2030: 0,
        contractEnd: "UFA",
      },
    ],
  };

  return mockPlayers[teamCode] || [];
};

type PlayerData = {
  id: string;
  name: string;
  position: string;
  contractYears: number;
  contractType: string;
  status: string;
  acquired: string;
  age: number;
  capPercentage: number;
  salary2025: number;
  salary2026: number;
  salary2027: number;
  salary2028: number;
  salary2029: number;
  salary2030: number;
  contractEnd: string;
};

type NHLTeamData = {
  id: string;
  name: string;
  code: string;
  capSpace: number;
  capHit: number;
  rosterSize: string;
  contracts: string;
  retainedSlots: string;
  players: PlayerData[];
};

const nhlTeamData: NHLTeamData[] = [
  {
    id: "24",
    name: "Anaheim Ducks",
    code: "ANA",
    capSpace: -20_576_311,
    capHit: 74_923_689,
    rosterSize: "22 / 23",
    contracts: "40 / 50",
    retainedSlots: "1 / 3",
    players: generateMockPlayers("ANA"),
  },
  {
    id: "6",
    name: "Boston Bruins",
    code: "BOS",
    capSpace: 460_833,
    capHit: 95_039_167,
    rosterSize: "25 / 23",
    contracts: "45 / 50",
    retainedSlots: "1 / 3",
    players: generateMockPlayers("BOS"),
  },
  {
    id: "7",
    name: "Buffalo Sabres",
    code: "BUF",
    capSpace: 5_190_318,
    capHit: 90_309_682,
    rosterSize: "23 / 23",
    contracts: "44 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "20",
    name: "Calgary Flames",
    code: "CGY",
    capSpace: 11_345_000,
    capHit: 84_155_000,
    rosterSize: "22 / 23",
    contracts: "42 / 50",
    retainedSlots: "1 / 3",
    players: [],
  },
  {
    id: "12",
    name: "Carolina Hurricanes",
    code: "CAR",
    capSpace: 10_647_291,
    capHit: 84_852_709,
    rosterSize: "23 / 23",
    contracts: "43 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "16",
    name: "Chicago Blackhawks",
    code: "CHI",
    capSpace: 17_637_024,
    capHit: 77_862_976,
    rosterSize: "22 / 23",
    contracts: "40 / 50",
    retainedSlots: "1 / 3",
    players: [],
  },
  {
    id: "21",
    name: "Colorado Avalanche",
    code: "COL",
    capSpace: 6_075_000,
    capHit: 89_425_000,
    rosterSize: "19 / 23",
    contracts: "44 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "29",
    name: "Columbus Blue Jackets",
    code: "CBJ",
    capSpace: 15_531_666,
    capHit: 79_968_334,
    rosterSize: "23 / 23",
    contracts: "43 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "25",
    name: "Dallas Stars",
    code: "DAL",
    capSpace: 1_955_084,
    capHit: 93_544_916,
    rosterSize: "21 / 23",
    contracts: "46 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "17",
    name: "Detroit Red Wings",
    code: "DET",
    capSpace: 10_311_627,
    capHit: 85_188_373,
    rosterSize: "23 / 23",
    contracts: "45 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "22",
    name: "Edmonton Oilers",
    code: "EDM",
    capSpace: 225_833,
    capHit: 95_274_167,
    rosterSize: "23 / 23",
    contracts: "46 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "13",
    name: "Florida Panthers",
    code: "FLA",
    capSpace: -3_725_000,
    capHit: 99_225_000,
    rosterSize: "23 / 23",
    contracts: "46 / 50",
    retainedSlots: "0 / 3",
    players: generateMockPlayers("FLA"),
  },
  {
    id: "26",
    name: "Los Angeles Kings",
    code: "LAK",
    capSpace: 1_893_334,
    capHit: 93_606_666,
    rosterSize: "24 / 23",
    contracts: "45 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "30",
    name: "Minnesota Wild",
    code: "MIN",
    capSpace: 6_991_834,
    capHit: 88_508_166,
    rosterSize: "21 / 23",
    contracts: "43 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "8",
    name: "Montréal Canadiens",
    code: "MTL",
    capSpace: 5_678_334,
    capHit: 89_821_666,
    rosterSize: "22 / 23",
    contracts: "43 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "18",
    name: "Nashville Predators",
    code: "NSH",
    capSpace: 11_066_039,
    capHit: 84_433_961,
    rosterSize: "18 / 23",
    contracts: "41 / 50",
    retainedSlots: "2 / 3",
    players: [],
  },
  {
    id: "1",
    name: "New Jersey Devils",
    code: "NJD",
    capSpace: 6_269_167,
    capHit: 89_230_833,
    rosterSize: "23 / 23",
    contracts: "47 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "2",
    name: "New York Islanders",
    code: "NYI",
    capSpace: 2_525_000,
    capHit: 92_975_000,
    rosterSize: "23 / 23",
    contracts: "47 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "3",
    name: "New York Rangers",
    code: "NYR",
    capSpace: 1_527_976,
    capHit: 93_972_024,
    rosterSize: "21 / 23",
    contracts: "45 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "9",
    name: "Ottawa Senators",
    code: "OTT",
    capSpace: 2_744_286,
    capHit: 92_755_714,
    rosterSize: "24 / 23",
    contracts: "43 / 50",
    retainedSlots: "1 / 3",
    players: [],
  },
  {
    id: "4",
    name: "Philadelphia Flyers",
    code: "PHI",
    capSpace: 227_739,
    capHit: 95_272_261,
    rosterSize: "21 / 23",
    contracts: "46 / 50",
    retainedSlots: "2 / 3",
    players: [],
  },
  {
    id: "5",
    name: "Pittsburgh Penguins",
    code: "PIT",
    capSpace: 13_016_904,
    capHit: 82_483_096,
    rosterSize: "22 / 23",
    contracts: "46 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "28",
    name: "San Jose Sharks",
    code: "SJS",
    capSpace: 18_824_166,
    capHit: 76_675_834,
    rosterSize: "22 / 23",
    contracts: "48 / 50",
    retainedSlots: "2 / 3",
    players: [],
  },
  {
    id: "55",
    name: "Seattle Kraken",
    code: "SEA",
    capSpace: 4_959_286,
    capHit: 90_540_714,
    rosterSize: "22 / 23",
    contracts: "46 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "19",
    name: "St. Louis Blues",
    code: "STL",
    capSpace: 8_075_151,
    capHit: 87_424_849,
    rosterSize: "22 / 23",
    contracts: "46 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "14",
    name: "Tampa Bay Lightning",
    code: "TBL",
    capSpace: 1_870_000,
    capHit: 93_630_000,
    rosterSize: "22 / 23",
    contracts: "47 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "10",
    name: "Toronto Maple Leafs",
    code: "TOR",
    capSpace: 1_137_705,
    capHit: 94_362_295,
    rosterSize: "24 / 23",
    contracts: "45 / 50",
    retainedSlots: "0 / 3",
    players: generateMockPlayers("TOR"),
  },
  {
    id: "23",
    name: "Vancouver Canucks",
    code: "VAN",
    capSpace: 3_270_000,
    capHit: 92_230_000,
    rosterSize: "22 / 23",
    contracts: "45 / 50",
    retainedSlots: "1 / 3",
    players: [],
  },
  {
    id: "54",
    name: "Vegas Golden Knights",
    code: "VGK",
    capSpace: 1_186_428,
    capHit: 94_313_572,
    rosterSize: "21 / 23",
    contracts: "48 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "15",
    name: "Washington Capitals",
    code: "WSH",
    capSpace: 4_200_000,
    capHit: 91_300_000,
    rosterSize: "23 / 23",
    contracts: "44 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "52",
    name: "Winnipeg Jets",
    code: "WPG",
    capSpace: 4_798_809,
    capHit: 90_701_191,
    rosterSize: "23 / 23",
    contracts: "45 / 50",
    retainedSlots: "0 / 3",
    players: [],
  },
  {
    id: "59",
    name: "Utah Hockey Club",
    code: "UTA",
    capSpace: 6_158_643,
    capHit: 89_341_357,
    rosterSize: "23 / 23",
    contracts: "47 / 50",
    retainedSlots: "1 / 3",
    players: [],
  },
];

// Format currency helper
const formatCurrency = (amount: number) => {
  if (amount === 0) {
    return "-";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Sub-table component for player details
function PlayerSubTable({ players }: { players: PlayerData[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "salary2025", desc: true },
  ]);

  const columns = useMemo<ColumnDef<PlayerData>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Player",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.original.name}</span>
            <Badge className="text-xs" variant="outline">
              {row.original.position}
            </Badge>
          </div>
        ),
        size: 150,
      },
      {
        accessorKey: "contractYears",
        header: "Years",
        cell: (info) => `${info.getValue()} ${info.row.original.contractType}`,
        size: 80,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <Badge className="text-xs" variant="secondary">
            {info.getValue() as string}
          </Badge>
        ),
        size: 80,
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: (info) => info.getValue(),
        size: 60,
      },
      {
        accessorKey: "capPercentage",
        header: "Cap %",
        cell: (info) => `${info.getValue()}%`,
        size: 70,
      },
      {
        accessorKey: "salary2025",
        header: "2025-26",
        cell: (info) => formatCurrency(info.getValue() as number),
        size: 90,
      },
      {
        accessorKey: "salary2026",
        header: "2026-27",
        cell: (info) => formatCurrency(info.getValue() as number),
        size: 90,
      },
      {
        accessorKey: "contractEnd",
        header: "End",
        cell: (info) => info.getValue(),
        size: 70,
      },
    ],
    []
  );

  const table = useReactTable({
    data: players.slice(0, TOP_PLAYERS_LIMIT),
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (players.length === 0) {
    return (
      <div className="bg-muted/30 p-6 text-center text-muted-foreground">
        No player data available for this team.
      </div>
    );
  }

  return (
    <div className="bg-muted/30 p-4">
      <div className="mb-3 font-medium text-foreground text-sm">
        Top {TOP_PLAYERS_LIMIT} Highest Paid Players
      </div>
      <DataGrid
        recordCount={Math.min(players.length, TOP_PLAYERS_LIMIT)}
        table={table}
        tableLayout={{
          cellBorder: true,
          rowBorder: true,
          headerBackground: true,
          headerBorder: true,
          dense: true,
        }}
      >
        <div className="w-full">
          <DataGridContainer>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
        </div>
      </DataGrid>
    </div>
  );
}

export default function NHLTeamCapGrid() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const [sorting, setSorting] = useState<SortingState>([
    { id: "capVisualization", desc: true },
  ]);

  const [expandedRows, setExpandedRows] = useState<ExpandedState>({});

  const columns = useMemo<ColumnDef<NHLTeamData>[]>(() => {
    return [
      {
        id: "expand",
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <Button
              mode="icon"
              onClick={row.getToggleExpandedHandler()}
              size="sm"
              variant="ghost"
            >
              {row.getIsExpanded() ? <SquareMinus /> : <SquarePlus />}
            </Button>
          ) : null;
        },
        size: 15,
        enableResizing: false,
        meta: {
          expandedContent: (row: NHLTeamData) => (
            <PlayerSubTable players={row.players} />
          ),
        },
      },
      {
        accessorKey: "name",
        id: "name",
        header: "Team",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <TeamLogo size="md" teamCode={row.original.code} />
              <Link
                className="font-medium text-foreground hover:text-primary"
                href={`/teams/${row.original.code}`}
              >
                {row.original.name}
              </Link>
            </div>
          );
        },
        size: 100,
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "capVisualization",
        header: "Salary Cap",
        accessorFn: (row) => row.capSpace,
        cell: ({ row }) => {
          const capSpace = row.original.capSpace;
          const capHit = row.original.capHit;

          const capHitPercentage = Math.min(
            (capHit / NHL_SALARY_CAP) * PERCENTAGE_MULTIPLIER,
            PERCENTAGE_MULTIPLIER
          );
          const capSpacePercentage = Math.max(
            0,
            Math.min(
              (capSpace / NHL_SALARY_CAP) * PERCENTAGE_MULTIPLIER,
              PERCENTAGE_MULTIPLIER
            )
          );
          const overCapPercentage = Math.max(
            0,
            (-capSpace / NHL_SALARY_CAP) * PERCENTAGE_MULTIPLIER
          );

          return (
            <div className="flex w-full flex-col gap-1">
              <div className="flex h-2.5 w-full items-center gap-0.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${Math.max(0, capHitPercentage - overCapPercentage)}%`,
                  }}
                />
                {capSpace > 0 && (
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${capSpacePercentage}%` }}
                  />
                )}
                {capSpace < 0 && (
                  <div
                    className="h-full bg-destructive"
                    style={{ width: `${overCapPercentage}%` }}
                  />
                )}
              </div>

              <div className="flex justify-between font-mono text-muted-foreground text-xs">
                <span
                  className={capSpace < 0 ? "font-medium text-destructive" : ""}
                >
                  {formatCurrency(capSpace)}
                </span>
                <span className="font-medium">{formatCurrency(capHit)}</span>
              </div>
            </div>
          );
        },
        size: 200,
        enableSorting: true,
        meta: {
          headerClassName: "text-center",
          cellClassName: "text-center",
        },
      },
      {
        accessorKey: "rosterSize",
        header: "Roster",
        cell: (info) => (
          <span className="text-muted-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 50,
        enableSorting: false,
        meta: {
          headerClassName: "text-center",
          cellClassName: "text-center",
        },
      },
      {
        accessorKey: "contracts",
        header: "Contracts",
        cell: (info) => (
          <span className="text-muted-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 50,
        enableSorting: false,
        meta: {
          headerClassName: "text-center",
          cellClassName: "text-center",
        },
      },
      {
        accessorKey: "retainedSlots",
        header: "Retained",
        cell: (info) => (
          <span className="text-muted-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 50,
        enableSorting: false,
        meta: {
          headerClassName: "text-center",
          cellClassName: "text-center",
        },
      },
    ];
  }, []);

  const table = useReactTable({
    columns,
    data: nhlTeamData,
    pageCount: Math.ceil((nhlTeamData?.length || 0) / pagination.pageSize),
    getRowId: (row: NHLTeamData) => row.id,
    getRowCanExpand: (row) =>
      Boolean(row.original.players && row.original.players.length > 0),
    state: {
      pagination,
      sorting,
      expanded: expandedRows,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onExpandedChange: setExpandedRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <DataGrid
      recordCount={nhlTeamData?.length || 0}
      table={table}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DataGridContainer>

        <DataGridPagination />
      </div>
    </DataGrid>
  );
}
