import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#191919] text-[#f1f1ef]">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="h-7 w-7 text-[#f1f1ef]" />
        <p className="text-sm text-[#9b9b9b]">Loading Quote</p>
      </div>
    </div>
  );
}
