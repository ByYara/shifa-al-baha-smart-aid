import { createFileRoute } from "@tanstack/react-router";
import { Activity, Radio } from "lucide-react";
import { Card, Disclaimer, Page, Stat, Tag } from "@/components/PortalChrome";
import { p, useLang } from "@/lib/i18n";
import { opsMetrics, regionSites, bedUnits } from "@/lib/mock-data";

export const Route = createFileRoute("/operations")({
  head: () => ({
    meta: [
      { title: "غرفة العمليات المركزية | شفاء الباحة الذكية" },
      {
        name: "description",
        content: "مؤشرات الحالات الحرجة وزمن الاستجابة وإشغال الأسرّة ونظرة جغرافية محاكاة لمنطقة الباحة.",
      },
      { property: "og:title", content: "غرفة العمليات المركزية | شفاء الباحة الذكية" },
      { property: "og:description", content: "متابعة مركزية للحالات الحرجة والأسرّة والنقل الطبي." },
    ],
  }),
  component: OperationsPage,
});

function OperationsPage() {
  const { tx } = useLang();
  const statusTone = { critical: "urgent", busy: "moderate", stable: "success" } as const;

  return (
    <Page>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {opsMetrics.map((m) => (
            <Stat
              key={m.label.en}
              label={tx(m.label)}
              value={typeof m.value === "string" ? m.value : tx(m.value)}
            />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card
            className="lg:col-span-2"
            title={tx(p("نظرة جغرافية محاكاة لمنطقة الباحة", "Simulated GIS overview — Al-Baha Region"))}
          >
            <div className="relative h-64 overflow-hidden rounded-md border border-border bg-secondary">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path d="M10 70 Q30 40 50 55 T90 30" fill="none" stroke="oklch(0.36 0.078 155 / 0.25)" strokeWidth="1" />
                <path d="M20 20 Q45 55 80 75" fill="none" stroke="oklch(0.36 0.078 155 / 0.2)" strokeWidth="1" />
              </svg>
              {regionSites.map((s) => (
                <div
                  key={s.name.en}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ inset: "auto", left: `${s.x}%`, top: `${s.y}%` }}
                >
                  <span
                    className={`block h-3 w-3 rounded-full ring-4 ${
                      s.status === "critical"
                        ? "bg-destructive ring-destructive/20"
                        : s.status === "busy"
                          ? "bg-warning ring-warning/20"
                          : "bg-success ring-success/20"
                    }`}
                  />
                  <span className="mt-1 block text-[10px] font-medium text-foreground">{tx(s.name)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {regionSites.map((s) => (
                <Tag key={s.name.en} tone={statusTone[s.status]}>
                  {tx(s.name)}
                </Tag>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card title={tx(p("إشغال الأسرّة بالمنطقة", "Regional bed occupancy"))}>
              <div className="space-y-3">
                {bedUnits.map((u) => {
                  const pct = Math.round((u.occupied / u.total) * 100);
                  return (
                    <div key={u.id}>
                      <div className="flex justify-between text-xs">
                        <span>{tx(u.unit)}</span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card title={tx(p("بلاغات النقل الجاري", "Live transport feed"))}>
              <ul className="space-y-2 text-xs">
                {[
                  p("SB-2455 · إخلاء جوي في الطريق — الوصول بعد ٦ دقائق", "SB-2455 · Air evacuation en route — arrival in 6 min"),
                  p("SB-2452 · إسعاف عناية مركزة انطلق من قلوة", "SB-2452 · ICU ambulance departed Qilwah"),
                  p("SB-2451 · تم التسليم في مستشفى الملك فهد", "SB-2451 · Handover completed at King Fahd Hospital"),
                ].map((line) => (
                  <li key={line.en} className="flex items-start gap-2 rounded-md bg-secondary p-2">
                    <Radio className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {tx(line)}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <Card title={tx(p("مؤشر أداء الخدمة", "Service performance"))}>
          <p className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-primary" />
            {tx(
              p(
                "متوسط زمن التنسيق انخفض من ٦ ساعات في المسار التقليدي إلى ٢٦ دقيقة عبر خدمة شفاء الباحة الذكية.",
                "Average coordination time dropped from 6 hours on the traditional path to 26 minutes through the Shifa Al-Baha Smart Service.",
              ),
            )}
          </p>
          <Disclaimer
            text={p(
              "جميع المؤشرات والخريطة بيانات محاكاة، ولا تمثل أرقامًا تشغيلية فعلية.",
              "All indicators and the map are simulated data and do not represent actual operational figures.",
            )}
          />
        </Card>
      </div>
    </Page>
  );
}
