import { Link } from "@tanstack/react-router";
import { AlertTriangle, Globe, ShieldCheck } from "lucide-react";
import { p, useLang } from "@/lib/i18n";
import { emirate, portalName, serviceName } from "@/lib/mock-data";

function Emblem() {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.12" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 42c4-3 6-8 6-14 0-3-1-6-3-8 5 1 9 5 9 11 0-6 4-10 9-11-2 2-3 5-3 8 0 6 2 11 6 14z"
        fill="currentColor"
      />
      <path d="M22 46h20M26 50h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 10v8M28 14h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const roles = [
  { to: "/journey", label: p("رحلة المستفيد", "Citizen Journey") },
  { to: "/physician", label: p("لوحة الطبيب", "Physician") },
  { to: "/hospital", label: p("إدارة الأسرّة", "Bed Management") },
  { to: "/operations", label: p("العمليات المركزية", "Central Operations") },
] as const;

export function PortalHeader() {
  const { tx, lang, toggle } = useLang();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gold" />
            {tx(p("موقع حكومي رسمي — المملكة العربية السعودية", "Official government site — Kingdom of Saudi Arabia"))}
          </span>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-md border border-gold/50 px-2.5 py-1 font-medium text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <div className="text-primary">
          <Emblem />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {tx(emirate)}
          </p>
          <h1 className="truncate font-display text-lg font-bold text-primary">{tx(serviceName)}</h1>
          <nav className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
            <span>{tx(portalName)}</span>
            <span aria-hidden>›</span>
            <span>{tx(p("الخدمات الإلكترونية", "e-Services"))}</span>
            <span aria-hidden>›</span>
            <span className="text-foreground">{tx(serviceName)}</span>
          </nav>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
              activeProps={{ className: "!bg-primary !text-primary-foreground !border-primary" }}
            >
              {tx(r.label)}
            </Link>
          ))}
        </div>
      </div>
      <p className="border-t border-border bg-secondary px-4 py-1.5 text-center text-[11px] text-secondary-foreground">
        {tx(
          p(
            "خدمة شفاء الباحة الذكية، مُدمجة داخل بوابة إمارة منطقة الباحة — نموذج تجريبي ببيانات محاكاة.",
            "The Shifa Al-Baha Smart Service, embedded within the Emirate of Al-Baha portal — prototype with simulated data.",
          ),
        )}
      </p>
    </header>
  );
}

export function EmergencyNotice() {
  const { tx } = useLang();
  return (
    <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        {tx(
          p(
            "تنبيه حالات الطوارئ الحرجة: في حال توقف التنفس أو النزيف الحاد اتصل بالهلال الأحمر ٩٩٧ فورًا — هذه الخدمة لا تُغني عن الاتصال بالطوارئ.",
            "Critical emergency notice: for breathing arrest or severe bleeding call the Red Crescent 997 immediately — this service does not replace emergency calls.",
          ),
        )}
      </p>
    </div>
  );
}

export function Disclaimer({ text }: { text: { ar: string; en: string } }) {
  const { tx } = useLang();
  return <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{tx(text)}</p>;
}

export function PortalFooter() {
  const { tx } = useLang();
  return (
    <footer className="mt-10 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl space-y-1 px-4 py-6 text-[11px] text-muted-foreground">
        <p className="font-medium text-foreground">{tx(portalName)}</p>
        <p>
          {tx(
            p(
              "جميع البيانات المعروضة بيانات محاكاة لأغراض العرض التجريبي، والاستخلاص الآلي للتقارير الطبية ميزة تجريبية تحت التقييم.",
              "All displayed data is simulated for demonstration purposes; automated medical report extraction is a trial feature under evaluation.",
            ),
          )}
        </p>
        <p>
          {tx(
            p(
              "للطوارئ الفعلية: الهلال الأحمر السعودي ٩٩٧.",
              "For real emergencies: Saudi Red Crescent 997.",
            ),
          )}
        </p>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  const { dir } = useLang();
  return (
    <div dir={dir} className="min-h-screen bg-background font-sans">
      <PortalHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <PortalFooter />
    </div>
  );
}

export function Card({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-border bg-card p-4 shadow-[0_1px_3px_oklch(0.36_0.078_155/0.08)] ${className}`}
    >
      {title && (
        <header className="mb-3 border-b border-border pb-2">
          <h2 className="font-display text-base font-bold text-primary">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}

export function Tag({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "urgent" | "moderate" | "muted" | "gold" | "success";
}) {
  const tones: Record<string, string> = {
    urgent: "bg-destructive/12 text-destructive border-destructive/30",
    moderate: "bg-warning/15 text-warning-foreground border-warning/40",
    success: "bg-success/12 text-success border-success/30",
    gold: "bg-gold/20 text-gold-foreground border-gold/50",
    muted: "bg-secondary text-secondary-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "gold";
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    gold: "bg-gold text-gold-foreground hover:bg-gold/90",
    outline: "border border-border bg-card text-foreground hover:bg-secondary",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
