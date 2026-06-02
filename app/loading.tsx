import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#191919] text-[#f1f1ef]">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#f1f1ef]/10 animate-ping" />
          <Spinner className="relative h-8 w-8 text-[#f1f1ef]" />
        </div>
        <p className="text-sm text-[#9b9b9b] animate-pulse">Loading Quote</p>
      </div>
    </div>
  );
}
