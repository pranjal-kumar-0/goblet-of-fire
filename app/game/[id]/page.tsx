import Round1 from "@/components/game/Round1";
import Round3 from "@/components/game/round-3/Round3";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = Number((await params).id);

  if (id === 1) {
    return <Round1 />;
  }

  if (id === 3) {
    return <Round3 />;
  }
}