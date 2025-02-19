import { DailyOrdersOverview } from "@/components/chart/DailyOrdersOverview";
import { DailyOrderPaymentOverview } from "@/components/chart/DailyOrdersPayment";
import TotalCategoriesOverview from "@/components/chart/TotalCategoriesOverview";
import TotalProductsOverview from "@/components/chart/TotalProductsOverview";
import TotalUserOverview from "@/components/chart/TotalUserOverview";

export default function Page() {
  return (
    <div className="container">
      <h2 className="mb-3 rounded bg-teal-800 p-3 text-lg font-bold text-balance text-slate-200 sm:text-xl md:text-2xl">
        Welcome to Zeroo Admin Dashboard
      </h2>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 *:min-w-56 *:first-of-type:bg-amber-200 *:last-of-type:bg-teal-200 *:nth-of-type-[2]:bg-rose-200">
          <TotalProductsOverview />
          <TotalCategoriesOverview />
          <TotalUserOverview />
        </div>
        <div className="flex flex-wrap gap-4">
          <DailyOrdersOverview />
          <DailyOrderPaymentOverview />
        </div>
      </div>
    </div>
  );
}
