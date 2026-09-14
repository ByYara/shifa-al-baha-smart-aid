import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Fingerprint, Loader2, ShieldCheck } from "lucide-react";
import { Button, Card, Disclaimer, EmergencyNotice, Page } from "@/components/PortalChrome";
import { p, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "شفاء الباحة الذكية | تحقق نفاذ — بوابة إمارة الباحة" },
      {
        name: "description",
        content:
          "الدخول عبر نفاذ الوطني الموحد لطلب الإخلاء الطبي عبر خدمة شفاء الباحة الذكية المدمجة في بوابة إمارة منطقة الباحة.",
      },
      { property: "og:title", content: "شفاء الباحة الذكية | تحقق نفاذ" },
      {
        property: "og:description",
        content: "خدمة ذكية للإخلاء الطبي والتنسيق بين مستشفيات منطقة الباحة.",
      },
    ],
  }),
  component: EntryPage,
});

function EntryPage() {
  const { tx } = useLang();
  const navigate = useNavigate();
  const [state, setState] = React.useState<"idle" | "waiting" | "done">("idle");
  const code = 47;

  React.useEffect(() => {
    if (state !== "waiting") return;
    const t = setTimeout(() => setState("done"), 2200);
    return () => clearTimeout(t);
  }, [state]);

  React.useEffect(() => {
    if (state !== "done") return;
    const t = setTimeout(() => navigate({ to: "/journey" }), 1200);
    return () => clearTimeout(t);
  }, [state, navigate]);

  return (
    <Page>
      <div className="mx-auto max-w-2xl space-y-4">
        <EmergencyNotice />
        <Card
          title={tx(p("التحقق عبر نفاذ الوطني الموحد", "Nafath National Single Sign-On"))}
          subtitle={tx(
            p(
              "قادم من بوابة إمارة منطقة الباحة — طلب إخلاء طبي / تحويل علاجي",
              "Arriving from the Emirate of Al-Baha portal — medical evacuation / treatment request",
            ),
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-md bg-secondary p-3">
              <Fingerprint className="h-8 w-8 text-primary" />
              <div className="text-xs text-secondary-foreground">
                <p className="font-semibold">
                  {tx(p("طلب إخلاء طبي عاجل", "Urgent medical evacuation request"))}
                </p>
                <p>{tx(p("رقم الطلب: SB-2455", "Request no.: SB-2455"))}</p>
              </div>
            </div>

            {state === "idle" && (
              <div className="space-y-3">
                <label className="block text-xs font-medium">
                  {tx(p("رقم الهوية الوطنية / الإقامة", "National ID / Iqama number"))}
                  <input
                    defaultValue="1•••••••••"
                    className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                  />
                </label>
                <Button onClick={() => setState("waiting")} className="w-full">
                  <ShieldCheck className="h-4 w-4" />
                  {tx(p("تسجيل الدخول بنفاذ", "Sign in with Nafath"))}
                </Button>
              </div>
            )}

            {state === "waiting" && (
              <div className="space-y-3 text-center">
                <p className="text-xs text-muted-foreground">
                  {tx(
                    p(
                      "اختر الرقم التالي في تطبيق نفاذ لإكمال التحقق",
                      "Select the following number in the Nafath app to complete verification",
                    ),
                  )}
                </p>
                <p className="font-display text-5xl font-bold text-primary">{code}</p>
                <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {tx(p("بانتظار التأكيد...", "Waiting for confirmation..."))}
                </p>
              </div>
            )}

            {state === "done" && (
              <div className="rounded-md border border-success/30 bg-success/10 p-4 text-center text-sm text-success">
                <ShieldCheck className="mx-auto mb-2 h-7 w-7" />
                {tx(
                  p("تم التحقق بنجاح — جارٍ فتح الفرز الذكي", "Verified successfully — opening smart triage"),
                )}
              </div>
            )}
          </div>
          <Disclaimer
            text={p(
              "محاكاة لتجربة نفاذ لأغراض العرض فقط، ولا يتم تبادل أي بيانات حقيقية.",
              "This is a simulated Nafath experience for demonstration only; no real data is exchanged.",
            )}
          />
        </Card>
      </div>
    </Page>
  );
}
