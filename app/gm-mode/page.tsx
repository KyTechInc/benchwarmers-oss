import LineupEditor from "@/components/gm-mode/lineup-editor";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="container mx-auto w-full space-y-4 p-4 md:p-6">
      <Card>
        <CardContent>
          <LineupEditor />
        </CardContent>
      </Card>
    </div>
  );
}
