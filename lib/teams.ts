/** biome-ignore-all lint/nursery/noShadow: biome suppression for team interface */
export type Team = {
  id: number;
  code: string;
  name: string;
  logo_dark: string;
  logo_light: string;
};

export function getTeamCodeById(id: number): string | undefined {
  const team = teams.find((team) => team.id === id);
  return team?.code;
}

export const teams = [
  {
    id: 24,
    code: "ANA",
    name: "Anaheim Ducks",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/ANA_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/ANA_light.svg",
  },
  {
    id: 6,
    code: "BOS",
    name: "Boston Bruins",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/BOS_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/BOS_light.svg",
  },
  {
    id: 7,
    code: "BUF",
    name: "Buffalo Sabres",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/BUF_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/BUF_light.svg",
  },
  {
    id: 20,
    code: "CGY",
    name: "Calgary Flames",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/CGY_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/CGY_light.svg",
  },
  {
    id: 12,
    code: "CAR",
    name: "Carolina Hurricanes",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/CAR_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/CAR_light.svg",
  },
  {
    id: 16,
    code: "CHI",
    name: "Chicago Blackhawks",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/CHI_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/CHI_light.svg",
  },
  {
    id: 21,
    code: "COL",
    name: "Colorado Avalanche",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/COL_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/COL_light.svg",
  },
  {
    id: 29,
    code: "CBJ",
    name: "Columbus Blue Jackets",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/CBJ_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg",
  },
  {
    id: 25,
    code: "DAL",
    name: "Dallas Stars",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/DAL_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/DAL_light.svg",
  },
  {
    id: 17,
    code: "DET",
    name: "Detroit Red Wings",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/DET_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/DET_light.svg",
  },
  {
    id: 22,
    code: "EDM",
    name: "Edmonton Oilers",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/EDM_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/EDM_light.svg",
  },
  {
    id: 13,
    code: "FLA",
    name: "Florida Panthers",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/FLA_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/FLA_light.svg",
  },
  {
    id: 26,
    code: "LAK",
    name: "Los Angeles Kings",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/LAK_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/LAK_light.svg",
  },
  {
    id: 30,
    code: "MIN",
    name: "Minnesota Wild",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/MIN_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/MIN_light.svg",
  },
  {
    id: 8,
    code: "MTL",
    name: "Montreal Canadiens",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/MTL_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/MTL_light.svg",
  },
  {
    id: 18,
    code: "NSH",
    name: "Nashville Predators",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/NSH_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/NSH_light.svg",
  },
  {
    id: 1,
    code: "NJD",
    name: "New Jersey Devils",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/NJD_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/NJD_light.svg",
  },
  {
    id: 2,
    code: "NYI",
    name: "New York Islanders",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/NYI_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/NYI_light.svg",
  },
  {
    id: 3,
    code: "NYR",
    name: "New York Rangers",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/NYR_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/NYR_light.svg",
  },
  {
    id: 9,
    code: "OTT",
    name: "Ottawa Senators",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/OTT_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/OTT_light.svg",
  },
  {
    id: 4,
    code: "PHI",
    name: "Philadelphia Flyers",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/PHI_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/PHI_light.svg",
  },
  {
    id: 5,
    code: "PIT",
    name: "Pittsburgh Penguins",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/PIT_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/PIT_light.svg",
  },
  {
    id: 28,
    code: "SJS",
    name: "San Jose Sharks",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/SJS_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/SJS_light.svg",
  },
  {
    id: 59,
    code: "UTA",
    name: "Utah Hockey Club",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/UTA_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/UTA_light.svg",
  },
  {
    id: 55,
    code: "SEA",
    name: "Seattle Kraken",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/SEA_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/SEA_light.svg",
  },
  {
    id: 19,
    code: "STL",
    name: "St. Louis Blues",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/STL_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/STL_light.svg",
  },
  {
    id: 14,
    code: "TBL",
    name: "Tampa Bay Lightning",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/TBL_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/TBL_light.svg",
  },
  {
    id: 10,
    code: "TOR",
    name: "Toronto Maple Leafs",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/TOR_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/TOR_light.svg",
  },
  {
    id: 23,
    code: "VAN",
    name: "Vancouver Canucks",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/VAN_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/VAN_light.svg",
  },
  {
    id: 54,
    code: "VGK",
    name: "Vegas Golden Knights",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/VGK_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/VGK_light.svg",
  },
  {
    id: 15,
    code: "WSH",
    name: "Washington Capitals",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/WSH_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/WSH_light.svg",
  },
  {
    id: 52,
    code: "WPG",
    name: "Winnipeg Jets",
    logo_dark: "https://assets.nhle.com/logos/nhl/svg/WPG_dark.svg",
    logo_light: "https://assets.nhle.com/logos/nhl/svg/WPG_light.svg",
  },
];
