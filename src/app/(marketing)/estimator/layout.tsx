import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Estimator | Alexander & Blake — R&D Tax Credit Advisory",
  description:
    "Estimate your potential federal and South Carolina R&D tax credit. Enter your qualified research expenses and see an approximate credit range — no obligation.",
};

export default function EstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
