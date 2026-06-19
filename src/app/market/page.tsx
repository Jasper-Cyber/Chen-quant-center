import MarketDashboard from "@/components/MarketDashboard";

export const metadata = { title: "Market Data" };

export default function MarketPage() {
  return (
    <div className="container-cqc py-14 md:py-12">
      
      <div className="mt-10">
        <MarketDashboard />
      </div>
    </div>
  );
}
