import { p, type Pair } from "./i18n";

export const serviceName = p("خدمة شفاء الباحة الذكية", "Shifa Al-Baha Smart Service");
export const emirate = p("إمارة منطقة الباحة", "Emirate of Al-Baha Region");
export const portalName = p("بوابة إمارة منطقة الباحة", "Emirate of Al-Baha Portal");

export type Hospital = {
  id: string;
  name: Pair;
  city: Pair;
  compatibility: number;
  bed: Pair;
  distanceKm: number;
  etaMin: number;
  best?: boolean;
};

export const hospitals: Hospital[] = [
  {
    id: "kf",
    name: p("مستشفى الملك فهد بالباحة", "King Fahd Hospital, Al-Baha"),
    city: p("الباحة", "Al-Baha"),
    compatibility: 96,
    bed: p("عناية مركزة - سرير ٤", "ICU - Bed 4"),
    distanceKm: 12,
    etaMin: 18,
    best: true,
  },
  {
    id: "bj",
    name: p("مستشفى بلجرشي العام", "Baljurashi General Hospital"),
    city: p("بلجرشي", "Baljurashi"),
    compatibility: 81,
    bed: p("عناية مركزة - سرير ٢", "ICU - Bed 2"),
    distanceKm: 46,
    etaMin: 39,
  },
  {
    id: "ml",
    name: p("مستشفى المندق العام", "Al-Mandaq General Hospital"),
    city: p("المندق", "Al-Mandaq"),
    compatibility: 64,
    bed: p("رعاية متوسطة - سرير ٧", "Step-down - Bed 7"),
    distanceKm: 38,
    etaMin: 34,
  },
  {
    id: "qw",
    name: p("مستشفى قلوة العام", "Qilwah General Hospital"),
    city: p("قلوة", "Qilwah"),
    compatibility: 52,
    bed: p("لا يوجد سرير عناية", "No ICU bed"),
    distanceKm: 71,
    etaMin: 58,
  },
];

export type Transport = {
  id: string;
  name: Pair;
  readiness: Pair;
  etaMin: number;
  note: Pair;
  recommended?: boolean;
};

export const transports: Transport[] = [
  {
    id: "icu",
    name: p("إسعاف العناية المركزة", "ICU Ambulance"),
    readiness: p("جاهز الآن", "Ready now"),
    etaMin: 9,
    note: p("طبيب مرافق وأجهزة تنفس", "Physician escort and ventilator"),
  },
  {
    id: "air",
    name: p("الإخلاء الجوي (مروحية)", "Air Evacuation (Helicopter)"),
    readiness: p("جاهز خلال ٦ دقائق", "Ready in 6 minutes"),
    etaMin: 14,
    note: p("الأسرع للحالات الحرجة والطرق الجبلية", "Fastest for critical cases and mountain roads"),
    recommended: true,
  },
  {
    id: "std",
    name: p("إسعاف اعتيادي", "Standard Ambulance"),
    readiness: p("جاهز الآن", "Ready now"),
    etaMin: 22,
    note: p("غير مناسب للحالات غير المستقرة", "Not suitable for unstable cases"),
  },
];

export type QueueCase = {
  id: string;
  patient: Pair;
  diagnosis: Pair;
  priority: "urgent" | "moderate" | "routine";
  facility: Pair;
  waited: Pair;
};

export const physicianQueue: QueueCase[] = [
  {
    id: "SB-2451",
    patient: p("م. ع. الغامدي (٥٨ سنة)", "M. A. Al-Ghamdi (58)"),
    diagnosis: p("نزيف دماغي حاد", "Acute intracranial hemorrhage"),
    priority: "urgent",
    facility: p("مركز صحي العقيق", "Al-Aqiq Health Center"),
    waited: p("٤ دقائق", "4 min"),
  },
  {
    id: "SB-2452",
    patient: p("ن. س. الزهراني (٣٤ سنة)", "N. S. Al-Zahrani (34)"),
    diagnosis: p("كسر مركب بالحوض", "Complex pelvic fracture"),
    priority: "urgent",
    facility: p("مستشفى قلوة العام", "Qilwah General Hospital"),
    waited: p("٩ دقائق", "9 min"),
  },
  {
    id: "SB-2453",
    patient: p("ف. م. الشهري (٦٧ سنة)", "F. M. Al-Shehri (67)"),
    diagnosis: p("هبوط قلبي مزمن متفاقم", "Decompensated heart failure"),
    priority: "moderate",
    facility: p("مستشفى المندق العام", "Al-Mandaq General Hospital"),
    waited: p("٢١ دقيقة", "21 min"),
  },
  {
    id: "SB-2454",
    patient: p("ع. ح. الغامدي (٤٥ سنة)", "A. H. Al-Ghamdi (45)"),
    diagnosis: p("التهاب بنكرياس حاد", "Acute pancreatitis"),
    priority: "routine",
    facility: p("مركز صحي بني حسن", "Bani Hasan Health Center"),
    waited: p("٤٠ دقيقة", "40 min"),
  },
];

export type BedUnit = { id: string; unit: Pair; total: number; occupied: number };

export const bedUnits: BedUnit[] = [
  { id: "icu", unit: p("العناية المركزة", "Intensive Care"), total: 14, occupied: 11 },
  { id: "ccu", unit: p("العناية القلبية", "Cardiac Care"), total: 10, occupied: 6 },
  { id: "er", unit: p("الطوارئ", "Emergency"), total: 22, occupied: 15 },
  { id: "ward", unit: p("التنويم الداخلي", "Inpatient Ward"), total: 60, occupied: 41 },
];

export const opsMetrics = [
  { label: p("الحالات الحرجة النشطة", "Active critical cases"), value: "7" },
  { label: p("متوسط زمن الاستجابة", "Average response time"), value: p("٢٦ دقيقة", "26 min") },
  { label: p("إشغال الأسرة بالمنطقة", "Regional bed occupancy"), value: "73%" },
  { label: p("الجهات المنسقة", "Coordinated entities"), value: "6" },
];

export const regionSites = [
  { name: p("الباحة", "Al-Baha"), x: 48, y: 40, status: "critical" as const },
  { name: p("بلجرشي", "Baljurashi"), x: 30, y: 62, status: "stable" as const },
  { name: p("المندق", "Al-Mandaq"), x: 62, y: 24, status: "stable" as const },
  { name: p("قلوة", "Qilwah"), x: 22, y: 30, status: "busy" as const },
  { name: p("العقيق", "Al-Aqiq"), x: 72, y: 66, status: "busy" as const },
];
