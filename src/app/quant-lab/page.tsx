import QuantLabClient from "@/components/QuantLabClient";

export const metadata = { title: "Quant Lab" };

export default function QuantLabPage() {
  return (
    <div className="container-cqc py-14 md:py-12">
      
      <div className="mt-10">
        <QuantLabClient />
      </div>
    </div>
  );
}
