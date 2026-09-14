import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  Ambulance,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Brain,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartPulse,
  Hospital as HospitalIcon,
  MapPin,
  MessageSquare,
  Star,
  Timer,
  Upload,
} from "lucide-react";
import {
  Button,
  Card,
  Disclaimer,
  EmergencyNotice,
  Page,
  Stat,
  Tag,
} from "@/components/PortalChrome";
import { p, useLang, type Pair } from "@/lib/i18n";
import { hospitals, transports } from "@/lib/mock-data";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "رحلة طلب الإخلاء الطبي | شفاء الباحة الذكية" },
      {
        name: "description",
        content:
          "تسع مراحل تفاعلية من الفرز الذكي إلى التسليم والتقييم عبر خدمة شفاء الباحة الذكية المدمجة في بوابة إمارة منطقة الباحة.",
      },
      { property: "og:title", content: "رحلة طلب الإخلاء الطبي | شفاء الباحة الذكية" },
      {
        property: "og:description",
        content: "فرز ذكي، استخلاص التقارير، مطابقة المستشفيات، النقل الطبي، والتتبع اللحظي.",
      },
    ],
  }),
  component: JourneyPage,
});

const stages: { title: Pair; icon: React.ElementType }[] = [
  { title: p("اختيار نوع الطلب", "Request Type Selection"), icon: ClipboardList },
  { title: p("المساعد الذكي والإسعافات الأولية", "Smart Assistant & First Aid"), icon: MessageSquare },
  { title: p("تحديد موقع المريض", "Patient Location"), icon: MapPin },
  { title: p("رفع التقرير الطبي", "Medical Report Upload"), icon: FileText },
  { title: p("التحليل وتصنيف الأولوية", "Analysis & Priority Classification"), icon: Brain },
  { title: p("المطابقة الذكية للمستشفيات", "Smart Hospital Matching"), icon: HospitalIcon },
  { title: p("قبول المستشفى", "Hospital Acceptance"), icon: BadgeCheck },
  { title: p("توجيه وسيلة النقل", "Transport Dispatch"), icon: Ambulance },
  { title: p("التتبع اللحظي", "Live Tracking"), icon: MapPin },
  { title: p("التسليم ومؤشرات الأثر", "Handover & Impact"), icon: Timer },
  { title: p("استبيان الرضا", "Satisfaction Survey"), icon: Star },
];

const requestTypes: { id: string; name: Pair; note: Pair }[] = [
  {
    id: "evac",
    name: p("إخلاء طبي عاجل", "Urgent medical evacuation"),
    note: p("نقل مريض حرج بين المرافق الصحية", "Transfer of a critical patient between health facilities"),
  },
  {
    id: "transfer",
    name: p("تحويل علاجي لتخصص غير متوفر", "Treatment referral for an unavailable specialty"),
    note: p("حالة مستقرة تحتاج تخصصًا دقيقًا", "Stable case requiring a subspecialty"),
  },
  {
    id: "advice",
    name: p("استشارة وإسعافات أولية", "Guidance and first aid"),
    note: p("توجيه عام قبل وصول الفريق الطبي", "General guidance before the medical team arrives"),
  },
];

const patientLocations: { id: string; name: Pair; note: Pair }[] = [
  {
    id: "aqiq",
    name: p("مركز صحي العقيق — الباحة", "Al-Aqiq Health Center — Al-Baha"),
    note: p("منوّم حاليًا في الطوارئ", "Currently admitted in the emergency department"),
  },
  { id: "home", name: p("المنزل", "At home"), note: p("حي الظفير — الباحة", "Al-Dhafir district — Al-Baha") },
  {
    id: "road",
    name: p("الطريق الجبلي (عقبة الباحة)", "Mountain road (Al-Baha escarpment)"),
    note: p("موقع يصعب وصول الإسعاف البري إليه", "Difficult access for ground ambulance"),
  },
];

type CaseType = "bleeding" | "fainting" | "burns" | "breathing" | "chest";

const caseTypes: { id: CaseType; label: Pair }[] = [
  { id: "bleeding", label: p("نزيف", "Bleeding") },
  { id: "fainting", label: p("إغماء", "Fainting") },
  { id: "burns", label: p("حروق", "Burns") },
  { id: "breathing", label: p("صعوبة في التنفس", "Breathing difficulty") },
  { id: "chest", label: p("ألم في الصدر", "Chest pain") },
];

const firstAid: Record<CaseType, Pair[]> = {
  bleeding: [
    p("اضغط مباشرة على موضع النزيف بشاش أو قطعة قماش نظيفة.", "Apply direct pressure on the wound with sterile gauze or a clean cloth."),
    p("ارفع الجزء المصاب فوق مستوى القلب إن أمكن.", "Raise the injured part above heart level if possible."),
    p("لا تُزل الشاش المتشبع بالدم، بل أضف طبقة أخرى فوقه.", "Do not remove blood-soaked gauze; add another layer on top."),
    p("حافظ على تدفئة المصاب وطمئنه ولا تتركه بمفرده.", "Keep the person warm and reassured; do not leave them alone."),
    p("إذا لم يتوقف النزيف أو كان غزيرًا فاتصل بالهلال الأحمر ٩٩٧.", "If bleeding does not stop or is heavy, call the Red Crescent 997."),
  ],
  fainting: [
    p("افسح مجالًا للهواء وأبعد الحشود عن المصاب.", "Allow fresh air and move bystanders away."),
    p("اجعله مستلقيًا على ظهره وارفع قدميه نحو ٣٠ سم.", "Lay them flat on their back and raise the legs about 30 cm."),
    p("فك الملابس الضيقة حول الرقبة والصدر.", "Loosen tight clothing around the neck and chest."),
    p("لا تُعطِه شيئًا بالفم قبل استعادة وعيه بالكامل.", "Give nothing by mouth until they are fully conscious."),
    p("إذا لم يستعد وعيه خلال دقيقة فاتصل بالهلال الأحمر ٩٩٧.", "If they do not regain consciousness within one minute, call 997."),
  ],
  burns: [
    p("أبعد المصاب عن مصدر الحرارة بأمان.", "Safely move the person away from the heat source."),
    p("برّد المنطقة بماء جارٍ فاتر لمدة ٢٠ دقيقة.", "Cool the area with cool running water for 20 minutes."),
    p("لا تستخدم الثلج أو المعاجين أو الزيوت.", "Do not use ice, pastes, or oils."),
    p("غطِّ الحرق بضماد نظيف غير لاصق ولا تفقأ الفقاعات.", "Cover with a clean non-adhesive dressing; do not burst blisters."),
    p("الحروق الواسعة أو حروق الوجه واليدين تستوجب الاتصال بـ ٩٩٧.", "Extensive burns or burns to the face and hands require calling 997."),
  ],
  breathing: [
    p("اجلس المصاب مستقيمًا مع ميل بسيط للأمام.", "Sit the person upright, leaning slightly forward."),
    p("افتح النوافذ وأزل المهيجات مثل الدخان والعطور.", "Open windows and remove irritants such as smoke and perfume."),
    p("ساعده على استخدام بخاخه الموصوف مسبقًا إن وُجد.", "Help them use their previously prescribed inhaler if available."),
    p("راقب لون الشفاه والأصابع ومستوى وعيه.", "Watch the colour of lips and fingers and their level of consciousness."),
    p("عند الازرقاق أو توقف التنفس اتصل بـ ٩٩٧ فورًا.", "If they turn blue or stop breathing, call 997 immediately."),
  ],
  chest: [
    p("أوقف أي مجهود واجعله يجلس في وضع مريح.", "Stop all exertion and have them sit in a comfortable position."),
    p("اتصل بالهلال الأحمر ٩٩٧ فورًا ولا تنتظر تحسن الألم.", "Call the Red Crescent 997 immediately; do not wait for the pain to ease."),
    p("فك الملابس الضيقة وحافظ على تهوية المكان.", "Loosen tight clothing and keep the area ventilated."),
    p("لا تدعه يقود السيارة بنفسه إلى المستشفى.", "Do not let them drive themselves to hospital."),
    p("إذا فقد الوعي وتوقف التنفس فابدأ الإنعاش القلبي الرئوي.", "If they lose consciousness and stop breathing, begin CPR."),
  ],
};

const dangerSigns = ["no-breathing", "severe-bleeding", "unconscious"] as const;

const triage: { id: string; q: Pair; options: { key: string; label: Pair }[] }[] = [
  {
    id: "identity",
    q: p("من هو المريض وما عمره؟", "Who is the patient and what is their age?"),
    options: [
      { key: "relative", label: p("قريب من الدرجة الأولى — ٥٨ سنة", "First-degree relative — 58 years") },
      { key: "self", label: p("المريض نفسه", "The patient") },
    ],
  },
  {
    id: "case",
    q: p("ما طبيعة الحالة الظاهرة الآن؟", "What is the apparent nature of the case right now?"),
    options: caseTypes.map((c) => ({ key: c.id, label: c.label })),
  },
  {
    id: "danger",
    q: p("هل توجد أي من علامات الخطر التالية؟", "Are any of the following danger signs present?"),
    options: [
      { key: "no-breathing", label: p("توقف التنفس", "Absence of breathing") },
      { key: "severe-bleeding", label: p("نزيف شديد", "Severe bleeding") },
      { key: "unconscious", label: p("فقدان الوعي", "Loss of consciousness") },
      { key: "none", label: p("لا توجد علامات خطر", "No danger signs") },
    ],
  },
  {
    id: "diagnosis",
    q: p("ما التشخيص المبدئي المذكور في التقرير؟", "What is the initial diagnosis in the report?"),
    options: [
      { key: "ich", label: p("نزيف دماغي حاد", "Acute intracranial hemorrhage") },
      { key: "unspecified", label: p("غير محدد", "Not specified") },
    ],
  },
  {
    id: "stability",
    q: p("هل حالة المريض مستقرة؟", "Is the patient's condition stable?"),
    options: [
      { key: "unstable", label: p("غير مستقرة — تدهور في الوعي", "Unstable — declining consciousness") },
      { key: "stable", label: p("مستقرة", "Stable") },
    ],
  },
  {
    id: "icu",
    q: p("هل يحتاج سرير عناية مركزة؟", "Does the patient need an ICU bed?"),
    options: [
      { key: "yes", label: p("نعم — بتوصية الطبيب المعالج", "Yes — recommended by treating physician") },
      { key: "unknown", label: p("غير معروف", "Unknown") },
    ],
  },
  {
    id: "consent",
    q: p(
      "هل توافق على مشاركة التقرير الطبي مع المستشفى المستقبل؟",
      "Do you consent to sharing the report with the receiving hospital?",
    ),
    options: [
      { key: "yes", label: p("أوافق", "I consent") },
      { key: "later", label: p("لاحقًا", "Later") },
    ],
  },
];

function FirstAidPanel({ caseType, danger }: { caseType: CaseType; danger: boolean }) {
  const { tx } = useLang();
  const label = caseTypes.find((c) => c.id === caseType)!.label;
  return (
    <div className="space-y-3">
      {danger && <EmergencyNotice />}
      <div className="rounded-md border-2 border-destructive/50 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
        {tx(
          p(
            "هذه معلومات إسعاف أولي عامة فقط ولا تُغني عن الاتصال بالطوارئ ٩٩٧ في الحالات الخطيرة.",
            "This is general first-aid information only and does not replace calling emergency services at 997 in serious cases.",
          ),
        )}
      </div>
      <div className="rounded-md border border-border bg-secondary/60 p-3">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
          <HeartPulse className="h-4 w-4" />
          {tx(p("نوع الحالة المُحدد", "Determined case type"))}: {tx(label)}
        </p>
        <ol className="space-y-1.5 text-xs">
          {firstAid[caseType].map((s, i) => (
            <li key={s.en} className="flex items-start gap-2 rounded bg-card p-2">
              <span className="font-display font-bold text-primary">{i + 1}.</span>
              <span>{tx(s)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StepRail({ step }: { step: number }) {
  const { tx } = useLang();
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-primary">
          {tx(p("المرحلة", "Stage"))} {step + 1} / {stages.length}
        </span>
        <span className="text-muted-foreground">{tx(stages[step]!.title)}</span>
      </div>
      <div className="mt-2 flex gap-1">
        {stages.map((s, i) => (
          <div
            key={s.title.en}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-secondary"}`}
          />
        ))}
      </div>
    </div>
  );
}

function JourneyPage() {
  const { tx } = useLang();
  const [step, setStep] = React.useState(0);

  // Stage 1 — request type
  const [requestType, setRequestType] = React.useState<string | null>(null);
  // Stage 2 — smart assistant
  const [answers, setAnswers] = React.useState<string[]>([]);
  // Stage 3 — patient location
  const [location, setLocation] = React.useState<string | null>(null);
  // Stage 4
  const [uploaded, setUploaded] = React.useState(false);
  // Stage 6
  const [sentTo, setSentTo] = React.useState<string | null>(null);
  // Stage 8
  const [transport, setTransport] = React.useState<string | null>(null);
  const [opsApproved, setOpsApproved] = React.useState(false);
  // Stage 11
  const [survey, setSurvey] = React.useState<Record<string, number>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const caseIndex = triage.findIndex((t) => t.id === "case");
  const dangerIndex = triage.findIndex((t) => t.id === "danger");
  const caseType = answers[caseIndex] as CaseType | undefined;
  const danger = dangerSigns.includes(answers[dangerIndex] as (typeof dangerSigns)[number]);

  const canNext = () => {
    if (step === 0) return !!requestType;
    if (step === 1) return answers.filter(Boolean).length >= triage.length;
    if (step === 2) return !!location;
    if (step === 3) return uploaded;
    if (step === 5) return !!sentTo;
    if (step === 7) return !!transport && opsApproved;
    if (step === 10) return submitted;
    return true;
  };

  const Icon = stages[step]!.icon;

  return (
    <Page>
      <div className="space-y-4">
        <EmergencyNotice />
        <StepRail step={step} />

        <Card
          title={`${tx(p("المرحلة", "Stage"))} ${step + 1} — ${tx(stages[step]!.title)}`}
          subtitle={tx(
            p(
              "خدمة شفاء الباحة الذكية، مُدمجة داخل بوابة إمارة منطقة الباحة",
              "The Shifa Al-Baha Smart Service, embedded within the Emirate of Al-Baha portal",
            ),
          )}
        >
          <div className="mb-3 flex items-center gap-2 text-sm text-primary">
            <Icon className="h-5 w-5" />
            <span className="font-medium">{tx(p("طلب رقم SB-2455", "Request SB-2455"))}</span>
          </div>

          {step === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {tx(
                  p(
                    "تم التحقق من هويتك عبر نفاذ. اختر نوع الطلب للمتابعة.",
                    "Your identity was verified through Nafath. Select the request type to continue.",
                  ),
                )}
              </p>
              {requestTypes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRequestType(r.id)}
                  className={`block w-full rounded-md border p-3 text-start transition-colors ${
                    requestType === r.id ? "border-primary bg-secondary" : "border-border hover:bg-secondary"
                  }`}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    {tx(r.name)}
                    {requestType === r.id && <Tag tone="success">{tx(p("محدد", "Selected"))}</Tag>}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{tx(r.note)}</p>
                </button>
              ))}
              <Disclaimer
                text={p(
                  "جميع أنواع الطلبات في هذا النموذج للعرض فقط ببيانات محاكاة.",
                  "All request types in this prototype are for demonstration with simulated data.",
                )}
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {triage.map((t, i) => {
                const answered = answers[i];
                const unlocked = i <= answers.filter(Boolean).length;
                if (!unlocked) return null;
                return (
                  <div key={t.id} className="rounded-md border border-border p-3">
                    <p className="text-sm font-medium">
                      {i + 1}. {tx(t.q)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {t.options.map((o) => (
                        <button
                          key={o.key}
                          onClick={() =>
                            setAnswers((a) => {
                              const next = [...a];
                              next[i] = o.key;
                              return next;
                            })
                          }
                          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                            answered === o.key
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          {tx(o.label)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {caseType && answers[dangerIndex] && <FirstAidPanel caseType={caseType} danger={danger} />}

              <Disclaimer
                text={p(
                  "المساعد الذكي يجمع المعلومات ويعرض إسعافات أولية عامة فقط، ولا يقدم تشخيصًا أو قرارًا علاجيًا.",
                  "The smart assistant only collects information and shows general first-aid steps; it provides no diagnosis or treatment decision.",
                )}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {patientLocations.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLocation(l.id)}
                  className={`block w-full rounded-md border p-3 text-start transition-colors ${
                    location === l.id ? "border-primary bg-secondary" : "border-border hover:bg-secondary"
                  }`}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-primary" />
                    {tx(l.name)}
                    {location === l.id && <Tag tone="success">{tx(p("محدد", "Selected"))}</Tag>}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{tx(l.note)}</p>
                </button>
              ))}
              <Disclaimer
                text={p(
                  "تحديد الموقع محاكاة توضيحية ولا يستخدم موقعك الفعلي.",
                  "Location selection is an illustrative simulation and does not use your real location.",
                )}
              />
            </div>
          )}


          {step === 3 && (
            <div className="space-y-3">
              <button
                onClick={() => setUploaded(true)}
                className="flex w-full flex-col items-center gap-2 rounded-md border-2 border-dashed border-border p-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-secondary"
              >
                <Upload className="h-6 w-6 text-primary" />
                {tx(p("ارفع التقرير الطبي (PDF أو صورة)", "Upload the medical report (PDF or image)"))}
              </button>

              {uploaded && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md border border-border p-3">
                    <p className="mb-2 text-xs font-semibold">
                      {tx(p("معاينة الملف", "File preview"))} — medical-report-SB2455.pdf
                    </p>
                    <div className="space-y-1.5 rounded bg-secondary p-3">
                      {[90, 75, 60, 85, 45, 70].map((w, i) => (
                        <div key={i} className="h-2 rounded bg-muted-foreground/25" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md border border-gold/50 bg-gold/10 p-3">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-gold-foreground">
                      <Brain className="h-4 w-4" />
                      {tx(p("بطاقة الاستخلاص الآلي", "Automated extraction card"))}
                    </p>
                    <dl className="space-y-1.5 text-xs">
                      {[
                        { k: p("التشخيص", "Diagnosis"), v: p("نزيف دماغي حاد", "Acute intracranial hemorrhage") },
                        { k: p("درجة الخطورة", "Severity"), v: p("عالية", "High") },
                        { k: p("التخصص المطلوب", "Specialty"), v: p("جراحة أعصاب", "Neurosurgery") },
                        { k: p("نوع السرير", "Bed type"), v: p("عناية مركزة", "Intensive care") },
                        { k: p("نسبة اكتمال البيانات", "Completeness score"), v: p("٩٢٪", "92%") },
                      ].map(({ k, v }) => (
                        <div key={k.en} className="flex justify-between gap-3">
                          <dt className="text-muted-foreground">{tx(k)}</dt>
                          <dd className="font-medium">{tx(v)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
              <Disclaimer
                text={p(
                  "الاستخلاص الآلي ميزة تجريبية بالذكاء الاصطناعي، ويجب التحقق من البيانات بواسطة الطبيب المختص.",
                  "Automated extraction is a trial AI feature; data must be verified by the attending physician.",
                )}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-destructive/40 bg-destructive/10 p-3">
                <Tag tone="urgent">{tx(p("عاجل", "Urgent"))}</Tag>
                <span className="text-sm">
                  {tx(p("درجة الأولوية المقترحة: عاجل (١ من ٣)", "Suggested priority: Urgent (1 of 3)"))}
                </span>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">{tx(p("الأسباب السريرية", "Clinical reasons"))}</p>
                <ul className="space-y-1.5 text-xs">
                  {[
                    p("تدهور مستوى الوعي خلال آخر ساعتين", "Declining consciousness within the last two hours"),
                    p("نزيف دماغي يتطلب تدخل جراحة أعصاب", "Intracranial hemorrhage requiring neurosurgical intervention"),
                    p("عدم توفر عناية مركزة في المرفق الحالي", "No intensive care available at the current facility"),
                    p("حاجة لمراقبة تنفسية مستمرة", "Need for continuous respiratory monitoring"),
                  ].map((r) => (
                    <li key={r.en} className="flex items-start gap-2 rounded bg-secondary p-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {tx(r)}
                    </li>
                  ))}
                </ul>
              </div>
              <Disclaimer
                text={p(
                  "التصنيف مُقترح آليًا وتجريبي، والقرار النهائي للطبيب المختص المعتمد.",
                  "The classification is automated and experimental; the final decision rests with the certified attending physician.",
                )}
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              {hospitals.map((h) => (
                <div
                  key={h.id}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-md border p-3 ${
                    h.best ? "border-gold bg-gold/10" : "border-border"
                  }`}
                >
                  <div className="min-w-[200px]">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      {tx(h.name)}
                      {h.best && <Tag tone="gold">{tx(p("أفضل مطابقة", "Best match"))}</Tag>}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tx(h.city)} · {tx(h.bed)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {h.distanceKm} {tx(p("كم", "km"))} · {tx(p("الوصول", "ETA"))} {h.etaMin}{" "}
                      {tx(p("دقيقة", "min"))}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="font-display text-lg font-bold text-primary">{h.compatibility}%</p>
                      <p className="text-[10px] text-muted-foreground">{tx(p("التوافق", "Compatibility"))}</p>
                    </div>
                    {sentTo === h.id ? (
                      <Tag tone="success">{tx(p("تم إرسال الطلب", "Request sent"))}</Tag>
                    ) : (
                      <Button
                        variant={h.best ? "gold" : "outline"}
                        disabled={!!sentTo}
                        onClick={() => setSentTo(h.id)}
                      >
                        {tx(p("إرسال الطلب", "Send Request"))}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Disclaimer
                text={p(
                  "نسب التوافق وتوفر الأسرّة بيانات محاكاة تُحدّث في النظام الفعلي لحظيًا.",
                  "Compatibility scores and bed availability are simulated; in the live system they update in real time.",
                )}
              />
            </div>
          )}

          {step === 6 && (
            <div className="space-y-3">
              <div className="rounded-md border border-success/30 bg-success/10 p-4">
                <p className="flex items-center gap-2 font-display text-base font-bold text-success">
                  <BadgeCheck className="h-5 w-5" />
                  {tx(p("تم قبول الحالة", "Case accepted"))}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tx(p("مستشفى الملك فهد بالباحة", "King Fahd Hospital, Al-Baha"))}
                </p>
              </div>
              <dl className="grid gap-3 sm:grid-cols-2">
                {[
                  { k: p("رقم السرير", "Bed number"), v: p("ICU-04", "ICU-04") },
                  { k: p("القسم", "Department"), v: p("العناية المركزة — جراحة أعصاب", "Intensive Care — Neurosurgery") },
                  { k: p("الطبيب المستقبل", "Attending physician"), v: p("د. سعد الغامدي — استشاري", "Dr. Saad Al-Ghamdi — Consultant") },
                  { k: p("وقت القبول", "Acceptance timestamp"), v: p("١٤:٣٢ — اليوم", "14:32 — Today") },
                ].map(({ k, v }) => (
                  <div key={k.en} className="rounded-md border border-border p-3">
                    <dt className="text-xs text-muted-foreground">{tx(k)}</dt>
                    <dd className="mt-0.5 text-sm font-semibold">{tx(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-3">
              {transports.map((t) => (
                <div
                  key={t.id}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-md border p-3 ${
                    transport === t.id ? "border-primary bg-secondary" : "border-border"
                  }`}
                >
                  <div className="min-w-[200px]">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <Ambulance className="h-4 w-4 text-primary" />
                      {tx(t.name)}
                      {t.recommended && <Tag tone="gold">{tx(p("موصى به", "Recommended"))}</Tag>}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx(t.note)}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {tx(t.readiness)} · {tx(p("الوصول", "ETA"))} {t.etaMin} {tx(p("دقيقة", "min"))}
                    </p>
                  </div>
                  <Button
                    variant={transport === t.id ? "primary" : "outline"}
                    onClick={() => setTransport(t.id)}
                  >
                    {transport === t.id ? tx(p("محدد", "Selected")) : tx(p("اختيار", "Select"))}
                  </Button>
                </div>
              ))}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-secondary p-3">
                <p className="text-xs">
                  {tx(p("يتطلب اعتماد غرفة العمليات المركزية", "Requires central operations approval"))}
                </p>
                {opsApproved ? (
                  <Tag tone="success">{tx(p("تم اعتماد التوجيه", "Dispatch approved"))}</Tag>
                ) : (
                  <Button variant="gold" disabled={!transport} onClick={() => setOpsApproved(true)}>
                    {tx(p("طلب اعتماد العمليات", "Request operations approval"))}
                  </Button>
                )}
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-4">
              <ol className="space-y-2">
                {[
                  [p("١٤:٣٢", "14:32"), p("قبول المستشفى وتخصيص السرير", "Hospital acceptance and bed assignment"), true],
                  [p("١٤:٣٦", "14:36"), p("اعتماد العمليات وتوجيه الإخلاء الجوي", "Operations approval and air evacuation dispatch"), true],
                  [p("١٤:٤٤", "14:44"), p("وصول الفريق إلى المرفق الحالي", "Team arrival at current facility"), true],
                  [p("١٤:٥٨", "14:58"), p("نقل المريض وانطلاق الرحلة", "Patient loaded and transfer underway"), true],
                  [p("١٥:١٢", "15:12"), p("الوصول المتوقع إلى المستشفى المستقبل", "Expected arrival at receiving hospital"), false],
                ].map(([time, label, done]) => (
                  <li key={(label as Pair).en} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${done ? "bg-success" : "bg-muted-foreground/40"}`}
                    />
                    <span className="text-xs">
                      <span className="font-semibold">{tx(time as Pair)}</span> — {tx(label as Pair)}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="rounded-md border border-border bg-secondary p-4">
                <div className="flex items-center justify-between gap-2 text-center text-[11px]">
                  <div className="flex-1">
                    <MapPin className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-1 font-medium">{tx(p("مركز صحي العقيق", "Al-Aqiq Health Center"))}</p>
                  </div>
                  <div className="flex-[2]">
                    <div className="relative h-1 rounded-full bg-muted-foreground/25">
                      <div className="absolute inset-y-0 start-0 w-2/3 rounded-full bg-primary" />
                      <Ambulance className="absolute -top-3 h-6 w-6 -translate-x-1/2 text-primary" style={{ left: "66%" }} />
                    </div>
                    <p className="mt-2 font-medium">{tx(p("إخلاء جوي — في الطريق", "Air evacuation — en route"))}</p>
                  </div>
                  <div className="flex-1">
                    <HospitalIcon className="mx-auto h-5 w-5 text-gold" />
                    <p className="mt-1 font-medium">{tx(p("مستشفى الملك فهد", "King Fahd Hospital"))}</p>
                  </div>
                </div>
              </div>
              <Disclaimer
                text={p(
                  "الخريطة والتتبع محاكاة توضيحية ولا تعتمد على موقع فعلي.",
                  "The map and tracking are an illustrative simulation and do not use real location data.",
                )}
              />
            </div>
          )}

          {step === 9 && (
            <div className="space-y-4">
              <div className="rounded-md border border-success/30 bg-success/10 p-4 text-sm text-success">
                <CheckCircle2 className="mb-1 h-5 w-5" />
                {tx(
                  p(
                    "تم تسليم المريض للفريق الطبي في العناية المركزة ICU-04 وتوقيع نموذج التسليم إلكترونيًا.",
                    "The patient was handed over to the intensive care team in ICU-04 and the handover form was signed electronically.",
                  ),
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label={tx(p("المسار التقليدي", "Traditional response"))} value={tx(p("٦ ساعات", "6 hours"))} />
                <Stat label={tx(p("خدمة شفاء الباحة", "Shifa Al-Baha service"))} value={tx(p("٤٠ دقيقة", "40 min"))} />
                <Stat label={tx(p("نسبة توفير الوقت", "Time saved"))} value="89%" />
                <Stat label={tx(p("الجهات المنسقة", "Coordinated entities"))} value="6" />
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="mb-2 text-xs font-semibold">{tx(p("الجهات المشاركة", "Participating entities"))}</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    p("إمارة منطقة الباحة", "Emirate of Al-Baha"),
                    p("صحة الباحة", "Al-Baha Health Cluster"),
                    p("الهلال الأحمر", "Red Crescent"),
                    p("الإخلاء الطبي الجوي", "Aeromedical Evacuation"),
                    p("مستشفى الملك فهد", "King Fahd Hospital"),
                    p("مركز صحي العقيق", "Al-Aqiq Health Center"),
                  ].map((e) => (
                    <Tag key={e.en}>{tx(e)}</Tag>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="space-y-4">
              {[
                p("سهولة تقديم الطلب", "Ease of submitting the request"),
                p("سرعة الاستجابة", "Speed of response"),
                p("وضوح التحديثات", "Clarity of updates"),
              ].map((q) => (
                <div key={q.en} className="rounded-md border border-border p-3">
                  <p className="text-sm font-medium">{tx(q)}</p>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        aria-label={`${n}`}
                        onClick={() => setSurvey((s) => ({ ...s, [q.en]: n }))}
                        className="p-0.5"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            (survey[q.en] ?? 0) >= n ? "fill-gold text-gold" : "text-muted-foreground/40"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {submitted ? (
                <div className="rounded-md border border-success/30 bg-success/10 p-3 text-sm text-success">
                  {tx(p("شكرًا لك، تم تسجيل تقييمك.", "Thank you, your feedback has been recorded."))}
                </div>
              ) : (
                <Button disabled={Object.keys(survey).length < 3} onClick={() => setSubmitted(true)}>
                  {tx(p("إرسال التقييم", "Submit feedback"))}
                </Button>
              )}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              <ArrowRight className="h-4 w-4 rtl:hidden" />
              <ArrowLeft className="hidden h-4 w-4 rtl:block" />
              {tx(p("السابق", "Back"))}
            </Button>
            <Button
              disabled={!canNext() || step === stages.length - 1}
              onClick={() => setStep((s) => Math.min(stages.length - 1, s + 1))}
            >
              {tx(p("التالي", "Next"))}
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}
