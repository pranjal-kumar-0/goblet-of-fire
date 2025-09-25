import Round1 from "@/components/game/Round1";
import Round3 from "@/components/game/round-3/Round3";

export default function Page({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id);

  if (id === 1) {
    return <Round1 />;
  }

  if (id === 3) {
    return <Round3 />;
  }
}