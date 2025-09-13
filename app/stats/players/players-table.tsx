"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, Search, UserRoundPlus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
  CardTitle,
  CardToolbar,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataGrid } from "@/components/ui/data-grid";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type IData = {
  id: string;
  name: string;
  headshotUrl: string;
  team: string;
  teamLogoUrl: string;
  position: string;
  season: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  shotsOnGoal: number;
  timeOnIce: number;
  penaltyMinutes: number;
};

const demoData: IData[] = [
  {
    id: "8476453",
    name: "Nikita Kucherov",
    headshotUrl: "https://data.benchwarmers.app/_Players/8476453-headshot.webp",
    team: "TBL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/TBL.svg",
    position: "R",
    season: "20242025",
    gamesPlayed: 78,
    goals: 37,
    assists: 84,
    points: 121,
    shotsOnGoal: 265,
    timeOnIce: 1271.3718,
    penaltyMinutes: 45,
  },
  {
    id: "8477492",
    name: "Nathan MacKinnon",
    headshotUrl: "https://data.benchwarmers.app/_Players/8477492-headshot.webp",
    team: "COL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/COL.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 79,
    goals: 32,
    assists: 84,
    points: 116,
    shotsOnGoal: 320,
    timeOnIce: 1366.9494,
    penaltyMinutes: 41,
  },
  {
    id: "8477934",
    name: "Leon Draisaitl",
    headshotUrl: "https://data.benchwarmers.app/_Players/8477934-headshot.webp",
    team: "EDM",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/EDM.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 71,
    goals: 52,
    assists: 54,
    points: 106,
    shotsOnGoal: 240,
    timeOnIce: 1291.0423,
    penaltyMinutes: 34,
  },
  {
    id: "8477956",
    name: "David Pastrnak",
    headshotUrl: "https://data.benchwarmers.app/_Players/8477956-headshot.webp",
    team: "BOS",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/BOS.svg",
    position: "R",
    season: "20242025",
    gamesPlayed: 82,
    goals: 43,
    assists: 63,
    points: 106,
    shotsOnGoal: 319,
    timeOnIce: 1211.1707,
    penaltyMinutes: 42,
  },
  {
    id: "8478483",
    name: "Mitch Marner",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478483-headshot.webp",
    team: "TOR",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/TOR.svg",
    position: "R",
    season: "20242025",
    gamesPlayed: 81,
    goals: 27,
    assists: 75,
    points: 102,
    shotsOnGoal: 173,
    timeOnIce: 1278.9259,
    penaltyMinutes: 14,
  },
  {
    id: "8478402",
    name: "Connor McDavid",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478402-headshot.webp",
    team: "EDM",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/EDM.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 67,
    goals: 26,
    assists: 74,
    points: 100,
    shotsOnGoal: 196,
    timeOnIce: 1321.8806,
    penaltyMinutes: 37,
  },
  {
    id: "8478398",
    name: "Kyle Connor",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478398-headshot.webp",
    team: "WPG",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/WPG.svg",
    position: "L",
    season: "20242025",
    gamesPlayed: 82,
    goals: 41,
    assists: 56,
    points: 97,
    shotsOnGoal: 267,
    timeOnIce: 1223.6829,
    penaltyMinutes: 25,
  },
  {
    id: "8478403",
    name: "Jack Eichel",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478403-headshot.webp",
    team: "VGK",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/VGK.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 77,
    goals: 28,
    assists: 66,
    points: 94,
    shotsOnGoal: 233,
    timeOnIce: 1232.013,
    penaltyMinutes: 8,
  },
  {
    id: "8480069",
    name: "Cale Makar",
    headshotUrl: "https://data.benchwarmers.app/_Players/8480069-headshot.webp",
    team: "COL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/COL.svg",
    position: "D",
    season: "20242025",
    gamesPlayed: 80,
    goals: 30,
    assists: 62,
    points: 92,
    shotsOnGoal: 246,
    timeOnIce: 1542.975,
    penaltyMinutes: 14,
  },
  {
    id: "8471675",
    name: "Sidney Crosby",
    headshotUrl: "https://data.benchwarmers.app/_Players/8471675-headshot.webp",
    team: "PIT",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/PIT.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 80,
    goals: 33,
    assists: 58,
    points: 91,
    shotsOnGoal: 227,
    timeOnIce: 1222.475,
    penaltyMinutes: 31,
  },
  {
    id: "8479343",
    name: "Clayton Keller",
    headshotUrl: "https://data.benchwarmers.app/_Players/8479343-headshot.webp",
    team: "UTA",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/UTA.svg",
    position: "R",
    season: "20242025",
    gamesPlayed: 81,
    goals: 30,
    assists: 60,
    points: 90,
    shotsOnGoal: 218,
    timeOnIce: 1147.0864,
    penaltyMinutes: 28,
  },
  {
    id: "8479542",
    name: "Brandon Hagel",
    headshotUrl: "https://data.benchwarmers.app/_Players/8479542-headshot.webp",
    team: "TBL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/TBL.svg",
    position: "L",
    season: "20242025",
    gamesPlayed: 82,
    goals: 35,
    assists: 55,
    points: 90,
    shotsOnGoal: 228,
    timeOnIce: 1244.5976,
    penaltyMinutes: 58,
  },
  {
    id: "8478550",
    name: "Artemi Panarin",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478550-headshot.webp",
    team: "NYR",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/NYR.svg",
    position: "L",
    season: "20242025",
    gamesPlayed: 80,
    goals: 37,
    assists: 52,
    points: 89,
    shotsOnGoal: 237,
    timeOnIce: 1180.9875,
    penaltyMinutes: 16,
  },
  {
    id: "8480018",
    name: "Nick Suzuki",
    headshotUrl: "https://data.benchwarmers.app/_Players/8480018-headshot.webp",
    team: "MTL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/MTL.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 82,
    goals: 30,
    assists: 59,
    points: 89,
    shotsOnGoal: 172,
    timeOnIce: 1203.6341,
    penaltyMinutes: 8,
  },
  {
    id: "8478420",
    name: "Mikko Rantanen",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478420-headshot.webp",
    team: "DAL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/DAL.svg",
    position: "R",
    season: "20242025",
    gamesPlayed: 82,
    goals: 32,
    assists: 56,
    points: 88,
    shotsOnGoal: 212,
    timeOnIce: 1274.9512,
    penaltyMinutes: 60,
  },
  {
    id: "8479407",
    name: "Jesper Bratt",
    headshotUrl: "https://data.benchwarmers.app/_Players/8479407-headshot.webp",
    team: "NJD",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/NJD.svg",
    position: "L",
    season: "20242025",
    gamesPlayed: 81,
    goals: 21,
    assists: 67,
    points: 88,
    shotsOnGoal: 180,
    timeOnIce: 1136.8889,
    penaltyMinutes: 18,
  },
  {
    id: "8476460",
    name: "Mark Scheifele",
    headshotUrl: "https://data.benchwarmers.app/_Players/8476460-headshot.webp",
    team: "WPG",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/WPG.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 82,
    goals: 39,
    assists: 48,
    points: 87,
    shotsOnGoal: 181,
    timeOnIce: 1226.3902,
    penaltyMinutes: 61,
  },
  {
    id: "8477939",
    name: "William Nylander",
    headshotUrl: "https://data.benchwarmers.app/_Players/8477939-headshot.webp",
    team: "TOR",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/TOR.svg",
    position: "R",
    season: "20242025",
    gamesPlayed: 82,
    goals: 45,
    assists: 39,
    points: 84,
    shotsOnGoal: 253,
    timeOnIce: 1170.5732,
    penaltyMinutes: 26,
  },
  {
    id: "8480039",
    name: "Martin Necas",
    headshotUrl: "https://data.benchwarmers.app/_Players/8480039-headshot.webp",
    team: "COL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/COL.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 79,
    goals: 27,
    assists: 56,
    points: 83,
    shotsOnGoal: 194,
    timeOnIce: 1139.9114,
    penaltyMinutes: 16,
  },
  {
    id: "8478440",
    name: "Dylan Strome",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478440-headshot.webp",
    team: "WSH",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/WSH.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 82,
    goals: 29,
    assists: 53,
    points: 82,
    shotsOnGoal: 149,
    timeOnIce: 1043.0244,
    penaltyMinutes: 34,
  },
  {
    id: "8478010",
    name: "Brayden Point",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478010-headshot.webp",
    team: "TBL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/TBL.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 77,
    goals: 42,
    assists: 40,
    points: 82,
    shotsOnGoal: 189,
    timeOnIce: 1168.7532,
    penaltyMinutes: 7,
  },
  {
    id: "8478460",
    name: "Zach Werenski",
    headshotUrl: "https://data.benchwarmers.app/_Players/8478460-headshot.webp",
    team: "CBJ",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/CBJ.svg",
    position: "D",
    season: "20242025",
    gamesPlayed: 81,
    goals: 23,
    assists: 59,
    points: 82,
    shotsOnGoal: 298,
    timeOnIce: 1604.716,
    penaltyMinutes: 31,
  },
  {
    id: "8475168",
    name: "Matt Duchene",
    headshotUrl: "https://data.benchwarmers.app/_Players/8475168-headshot.webp",
    team: "DAL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/DAL.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 82,
    goals: 30,
    assists: 52,
    points: 82,
    shotsOnGoal: 152,
    timeOnIce: 1028.5732,
    penaltyMinutes: 12,
  },
  {
    id: "8480023",
    name: "Robert Thomas",
    headshotUrl: "https://data.benchwarmers.app/_Players/8480023-headshot.webp",
    team: "STL",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/STL.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 70,
    goals: 21,
    assists: 60,
    points: 81,
    shotsOnGoal: 145,
    timeOnIce: 1197.4857,
    penaltyMinutes: 20,
  },
  {
    id: "8477933",
    name: "Sam Reinhart",
    headshotUrl: "https://data.benchwarmers.app/_Players/8477933-headshot.webp",
    team: "FLA",
    teamLogoUrl: "https://data.benchwarmers.app/NHL_Logos/_dark/FLA.svg",
    position: "C",
    season: "20242025",
    gamesPlayed: 79,
    goals: 39,
    assists: 42,
    points: 81,
    shotsOnGoal: 213,
    timeOnIce: 1230.1392,
    penaltyMinutes: 27,
  },
];

export default function DataGridDemo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  const filteredData = useMemo(() => {
    return demoData.filter((item) => {
      // Filter by position
      const matchesPosition =
        !selectedStatuses?.length || selectedStatuses.includes(item.position);

      // Filter by search query (case-insensitive)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        [item.name, item.team, item.position]
          .join(" ")
          .toLowerCase()
          .includes(searchLower);

      return matchesPosition && matchesSearch;
    });
  }, [searchQuery, selectedStatuses]);

  const positionCounts = useMemo(() => {
    return demoData.reduce(
      (acc, item) => {
        acc[item.position] = (acc[item.position] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, []);

  const handlePositionChange = (checked: boolean, value: string) => {
    setSelectedStatuses(
      (
        prev = [] // Default to an empty array
      ) => (checked ? [...prev, value] : prev.filter((v) => v !== value))
    );
  };

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader
            column={column}
            title="Player"
            visibility={true}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-10 rounded-full bg-muted">
                <AvatarImage
                  alt={row.original.name}
                  src={row.original.headshotUrl}
                />
                <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-px">
                <div className="font-medium text-foreground text-md">
                  {row.original.name}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Avatar className="size-8">
                    <AvatarImage src={row.original.teamLogoUrl} />
                    <AvatarFallback>{row.original.team}</AvatarFallback>
                  </Avatar>
                  {row.original.team} • {row.original.position}
                </div>
              </div>
            </div>
          );
        },
        size: 280,
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
        meta: {
          skeleton: (
            <div className="flex h-[41px] items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ),
        },
      },
      {
        accessorKey: "gamesPlayed",
        id: "gamesPlayed",
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="GP" visibility={true} />
        ),
        cell: (info) => info.getValue(),
        size: 60,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        meta: {
          skeleton: <Skeleton className="h-7 w-8" />,
        },
      },
      {
        accessorKey: "goals",
        id: "goals",
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="G" visibility={true} />
        ),
        cell: (info) => info.getValue(),
        size: 60,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        meta: {
          skeleton: <Skeleton className="h-7 w-8" />,
        },
      },
      {
        accessorKey: "assists",
        id: "assists",
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="A" visibility={true} />
        ),
        cell: (info) => info.getValue(),
        size: 60,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "points",
        id: "points",
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="P" visibility={true} />
        ),
        cell: (info) => info.getValue(),
        size: 60,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        meta: {
          skeleton: <Skeleton className="h-7 w-8" />,
        },
      },
      {
        accessorKey: "shotsOnGoal",
        id: "shotsOnGoal",
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="SOG" visibility={true} />
        ),
        cell: (info) => info.getValue(),
        size: 70,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        meta: {
          skeleton: <Skeleton className="h-7 w-10" />,
        },
      },
      {
        accessorKey: "timeOnIce",
        id: "timeOnIce",
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="TOI" visibility={true} />
        ),
        cell: (info) => `${Math.round(info.getValue() as number)}:00`,
        size: 80,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        meta: {
          skeleton: <Skeleton className="h-7 w-12" />,
        },
      },
      {
        accessorKey: "penaltyMinutes",
        id: "penaltyMinutes",
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="PIM" visibility={true} />
        ),
        cell: (info) => info.getValue(),
        size: 60,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        meta: {
          skeleton: <Skeleton className="h-7 w-8" />,
        },
      },
    ],
    []
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string)
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    columnResizeMode: "onChange",
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      isLoading={isLoading}
      recordCount={filteredData?.length || 0}
      table={table}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <Card>
        <CardHeader className="py-4">
          <CardTitle>NHL Players</CardTitle>
          <CardHeading>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="-translate-y-1/2 absolute start-3 top-1/2 size-4 text-muted-foreground" />
                <Input
                  className="w-40 ps-9"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search players..."
                  value={searchQuery}
                />
                {searchQuery.length > 0 && (
                  <Button
                    className="-translate-y-1/2 absolute end-1.5 top-1/2 h-6 w-6"
                    mode="icon"
                    onClick={() => setSearchQuery("")}
                    variant="ghost"
                  >
                    <X />
                  </Button>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter />
                    Position
                    {selectedStatuses.length > 0 && (
                      <Badge appearance="outline" size="sm">
                        {selectedStatuses.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-40 p-3">
                  <div className="space-y-3">
                    <div className="font-medium text-muted-foreground text-xs">
                      Filters
                    </div>
                    <div className="space-y-3">
                      {Object.keys(positionCounts).map((position) => (
                        <div
                          className="flex items-center gap-2.5"
                          key={position}
                        >
                          <Checkbox
                            checked={selectedStatuses.includes(position)}
                            id={position}
                            onCheckedChange={(checked) =>
                              handlePositionChange(checked === true, position)
                            }
                          />
                          <Label
                            className="flex grow items-center justify-between gap-1.5 font-normal"
                            htmlFor={position}
                          >
                            {position}
                            <span className="text-muted-foreground">
                              {positionCounts[position]}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeading>
          <CardToolbar>
            <Button onClick={handleToggleLoading} size="sm" variant="outline">
              {isLoading ? "Disable Loading" : "Enable Loading"}
            </Button>
            <Button>
              <UserRoundPlus />
              Add player
            </Button>
          </CardToolbar>
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
}
