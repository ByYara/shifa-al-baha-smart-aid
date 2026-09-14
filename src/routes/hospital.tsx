import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { BedDouble, Check, Minus, Plus, X } from "lucide-react";
import { Button, Card, Disclaimer, Page, Stat, Tag } from "@/components/PortalChrome";
import { p, useLang } from "@/lib/i18n";
import { bedUnits, physicianQueue } from "@/lib/mock-data";

export const Route = createFileRoute("/hospital")({
  head: () => ({
    meta: [
      { title: "إدارة أسرّة المستشفى | شفاء الباحة الذكية" },
      {
        name: "description",
        content: "استقبال الحالات الواردة وقبولها أو رفضها والتحكم في سعة الأسرّة بمستشفيات منطقة الباحة.",
      },
      { property: "og:title", content: "إدارة أسرّة المستشفى | شفاء الباحة الذكية" },
      { property: "og:description", content: "متابعة الحالات الواردة وسعة الأسرّة لحظيًا." },
    ],
  }),
  component: HospitalPage,
});

function HospitalPage() {
  const { tx } = useLang();
  const [decisions, setDecisions] = React.useState<Record<string, "accepted" | "rejected">>({});
  const [units, setUnits] = React.useState(bedUnits.map((u) => ({ ...u })));

  const adjust = (id: string, delta: number) =>
    setUnits((us) =>
      us.map((u) =>
        u.id === id ? { ...u, occupied: Math.min(u.total, Math.max(0, u.occupied + delta)) } : u,
      ),
    );

  const free = units.reduce((n, u) => n + (u.total - u.occupied), 0);

  return (
    <Page>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label={tx(p("أسرّة متاحة", "Available beds"))} value={String(free)} />
          <Stat label={tx(p("حالات واردة", "Inbound cases"))} value={String(physicianQueue.length)} />
          <Stat label={tx(p("مستشفى الملك فهد بالباحة", "King Fahd Hospital, Al-Baha"))} value={tx(p("مركز إحالة", "Referral centre"))} />
        </div>

        <Card title={tx(p("الحالات الواردة", "Inbound cases"))}>
          <div className="space-y-3">
            {physicianQueue.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3">
                <div className="min-w-[220px]">
                  <p className="text-sm font-semibold">
                    {c.id} — {tx(c.patient)}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx(c.diagnosis)}</p>
                  <p className="text-[11px] text-muted-foreground">{tx(c.facility)}</p>
                </div>
                {decisions[c.id] ? (
                  <Tag tone={decisions[c.id] === "accepted" ? "success" : "urgent"}>
                    {decisions[c.id] === "accepted"
                      ? tx(p("مقبول — تم تخصيص سرير", "Accepted — bed assigned"))
                      : tx(p("معتذر — لا يوجد سرير مناسب", "Declined — no suitable bed"))}
                  </Tag>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={() => setDecisions((d) => ({ ...d, [c.id]: "accepted" }))}>
                      <Check className="h-4 w-4" />
                      {tx(p("قبول", "Accept"))}
                    </Button>
                    <Button variant="outline" onClick={() => setDecisions((d) => ({ ...d, [c.id]: "rejected" }))}>
                      <X className="h-4 w-4" />
                      {tx(p("رفض", "Reject"))}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card title={tx(p("التحكم في سعة الأسرّة", "Bed capacity controls"))}>
          <div className="grid gap-3 sm:grid-cols-2">
            {units.map((u) => {
              const pct = Math.round((u.occupied / u.total) * 100);
              return (
                <div key={u.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <BedDouble className="h-4 w-4 text-primary" />
                      {tx(u.unit)}
                    </p>
                    <Tag tone={pct > 85 ? "urgent" : pct > 65 ? "moderate" : "success"}>{pct}%</Tag>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {u.occupied}/{u.total} {tx(p("مشغول", "occupied"))}
                    </span>
                    <span className="flex gap-1">
                      <Button variant="outline" className="px-2 py-1" onClick={() => adjust(u.id, -1)}>
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" className="px-2 py-1" onClick={() => adjust(u.id, 1)}>
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <Disclaimer
            text={p(
              "سعة الأسرّة والحالات الواردة بيانات محاكاة لأغراض العرض التجريبي فقط.",
              "Bed capacity and inbound cases are simulated data for demonstration purposes only.",
            )}
          />
        </Card>
      </div>
    </Page>
  );
}
