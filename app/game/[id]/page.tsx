"use client";
import Round1 from "@/components/game/Round1";
import Round3 from "@/components/game/round-3/Round3";
import ProtectedRoute from "@/components/ProtectedRoute";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);

  const renderRound = () => {
    if (id === 1) {
      return <Round1 />;
    }
    if (id === 3) {
      return <Round3 />;
    }
    return <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center">
      <h1 className="text-yellow-300 font-['Cinzel_Decorative'] text-2xl">Round {id} Coming Soon!</h1>
    </div>;
  };

  return (
    <ProtectedRoute>
      {renderRound()}
    </ProtectedRoute>
  );
}