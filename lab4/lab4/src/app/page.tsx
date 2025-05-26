import { ClientOnly } from "@/components/ClientOnly";
import { QuoteFetcher } from "@/components/QuoteFetcher";

export default function Home() {
  return (
    <div>
      <ClientOnly>
        <QuoteFetcher />
      </ClientOnly>
    </div>
  );
}
