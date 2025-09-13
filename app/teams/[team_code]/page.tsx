export default function TeamPage({
  params,
}: {
  params: { team_code: string };
}) {
  return <div>TeamPage {params.team_code}</div>;
}
