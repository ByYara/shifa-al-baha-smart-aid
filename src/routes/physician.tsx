import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Stethoscope } from "lucide-react";
import { Button, Card, Disclaimer, EmergencyNotice, Page, Stat, Tag } from "@/components/PortalChrome";
import { p, useLang } from "@/lib/i18n";
import { physicianQueue } from "@/lib/mock-data";

export const Route = createFileRoute("/physician")({
  head: () => ({
    meta: [
      { title: "لوحة الطبيب المختص | شفاء الباحة الذكية" },
      {
        name: "description",
        content: "قائمة طلبات الإخلاء الطبي بأولوياتها ومراجعتها من الطبيب المختص في منطقة الباحة.",
      },
      { property: "og:title", content: "لوحة الطبيب المختص | شفاء الباحة الذكية" },
      { property: "og:description", content: "مراجعة طلبات الإخلاء الطبي وتصنيف أولوياتها." },
    ],
  }),
  component: PhysicianPage,
});

function PhysicianPage() {
  const { tx } = useLang();
  const [reviewed, setReviewed] = React.useState<Record<string, "approved" | "returned">>({});

  const tone = (pr: string) => (pr === "urgent" ? "urgent" : pr === "moderate" ? "moderate" : "muted");
  const label = (pr: string) =>
    pr === "urgent"
      ? tx(p("عاجل", "Urgent"))
      : pr === "moderate"
        ? tx(p("متوسط", "Moderate"))
        : tx(p("اعتيادي", "Routine"));

  return (
    <Page>
      <div className="space-y-4">
        <EmergencyNotice />
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label={tx(p("طلبات بانتظار المراجعة", "Awaiting review"))} value={String(physicianQueue.length - Object.keys(reviewed).length)} />
          <Stat label={tx(p("حالات عاجلة", "Urgent cases"))} value="2" />
          <Stat label={tx(p("متوسط زمن المراجعة", "Average review time"))} value={tx(p("٣ دقائق", "3 min"))} />
        </div>

        <Card
          title={tx(p("قائمة الطلبات الطبية", "Medical request queue"))}
          subtitle={tx(
            p("المراجعة السريرية النهائية من مسؤولية الطبيب المختص", "Final clinical review is the responsibility of the attending physician"),
          )}
        >
          <div className="space-y-3">
            {physicianQueue.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="min-w-[220px] space-y-1">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">{tx(c.patient)}</span>
                    <Tag tone={tone(c.priority) as "urgent"}>{label(c.priority)}</Tag>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {c.id} — {tx(c.diagnosis)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {tx(c.facility)} · {tx(p("زمن الانتظار", "Waiting"))}: {tx(c.waited)}
                  </p>
                </div>
                {reviewed[c.id] ? (
                  <Tag tone={reviewed[c.id] === "approved" ? "success" : "muted"}>
                    {reviewed[c.id] === "approved"
                      ? tx(p("تمت الموافقة السريرية", "Clinically approved"))
                      : tx(p("أُعيد لطلب معلومات", "Returned for information"))}
                  </Tag>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={() => setReviewed((r) => ({ ...r, [c.id]: "approved" }))}>
                      {tx(p("اعتماد الطلب", "Approve"))}
                    </Button>
                    <Button variant="outline" onClick={() => setReviewed((r) => ({ ...r, [c.id]: "returned" }))}>
                      {tx(p("طلب معلومات", "Request info"))}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Disclaimer
            text={p(
              "الحالات المعروضة بيانات محاكاة، والتصنيف الآلي للأولوية ميزة تجريبية لا تُلزم القرار الطبي.",
              "Cases shown are simulated data; automated priority classification is a trial feature and does not bind the medical decision.",
            )}
          />
        </Card>
      </div>
    </Page>
  );
}
