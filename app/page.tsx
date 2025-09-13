import DataGridDemo from "@/components/data-grid/dense";
import LeagueCard from "@/components/league-card";
import PlayerList from "@/components/player-list/default";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          {/* League Cap Overview - Takes up 1 column */}
          <div className="lg:col-span-1">
            <LeagueCard />
          </div>

          {/* Player Lists - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex h-full gap-4 overflow-x-auto">
              <div className="flex-shrink-0">
                <PlayerList category="UFAs" />
              </div>
              <div className="flex-shrink-0">
                <PlayerList category="RFAs" />
              </div>
              <div className="flex-shrink-0">
                <PlayerList category="PTOs" />
              </div>
              <div className="flex-shrink-0">
                <PlayerList category="Buyouts" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-8">
          <DataGridDemo />
        </div>
      </div>
    </div>
  );
}
