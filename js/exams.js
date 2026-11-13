/* ============================================================
   PROSTUTI EXAM PORTAL – DATA FILE (edit only this file)
   ============================================================ */

// Time zone used for ALL exam times (IANA name). Default: Asia/Dhaka
const settings = { timezone: "Asia/Dhaka" };

const course = {
  name: "মেডিকেল ভর্তি ২০২৬ ব্যাচ - অদম্য",
  title: "Model Test Examination Routine",
  description: "আপনার নির্ধারিত পরীক্ষাটি খুঁজে নিন এবং পরীক্ষা শুরু হওয়ার সময় “Start Exam” বাটনে ক্লিক করুন।"
};

// Section headings (shown like the PDF routine)
const G1 = "টপিক এক্সাম (১৫ – ২৩ নভেম্বর)";
const G2 = "পেপার ফাইনাল ও সাবজেক্ট ফাইনাল (২৪ নভেম্বর – ৫ ডিসেম্বর)";
const G3 = "মডেল টেস্ট (৬ – ১৬ ডিসেম্বর)";

/* Fields: id, date (YYYY-MM-DD), group, title, subject, syllabus (optional),
   startTime (HH:MM, 24h), duration (minutes), examLink, enabled (true/false)
   NOTE: times, durations and links below are PLACEHOLDERS – replace them. */
const exams = [
  // ---- Topic Exams ----
  { id: 1,  date: "2026-11-15", group: G1, title: "টপিক এক্সাম ১", subject: "বায়োলজি ১ম ও ২য় পত্র", syllabus: "১ম পত্র: অধ্যায় ১–৪ · ২য় পত্র: অধ্যায় ১–৪", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1001", enabled: true },
  { id: 2,  date: "2026-11-16", group: G1, title: "টপিক এক্সাম ২", subject: "বায়োলজি ১ম ও ২য় পত্র", syllabus: "১ম পত্র: অধ্যায় ৫–৮ · ২য় পত্র: অধ্যায় ৫–৮", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1002", enabled: true },
  { id: 3,  date: "2026-11-17", group: G1, title: "টপিক এক্সাম ৩", subject: "বায়োলজি ১ম ও ২য় পত্র", syllabus: "১ম পত্র: অধ্যায় ৯–১২ · ২য় পত্র: অধ্যায় ৯–১২", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1003", enabled: true },
  { id: 4,  date: "2026-11-18", group: G1, title: "টপিক এক্সাম ৪", subject: "কেমিস্ট্রি ১ম পত্র", syllabus: "অধ্যায় ১–৩", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1004", enabled: true },
  { id: 5,  date: "2026-11-19", group: G1, title: "টপিক এক্সাম ৫", subject: "কেমিস্ট্রি ১ম ও ২য় পত্র", syllabus: "১ম পত্র: অধ্যায় ৪–৫ · ২য় পত্র: অধ্যায় ১–২", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1005", enabled: true },
  { id: 6,  date: "2026-11-20", group: G1, title: "টপিক এক্সাম ৬", subject: "কেমিস্ট্রি ২য় পত্র", syllabus: "অধ্যায় ৩–৫", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1006", enabled: true },
  { id: 7,  date: "2026-11-21", group: G1, title: "টপিক এক্সাম ৭", subject: "ফিজিক্স ১ম পত্র", syllabus: "অধ্যায় ১–৭", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1007", enabled: true },
  { id: 8,  date: "2026-11-22", group: G1, title: "টপিক এক্সাম ৮", subject: "ফিজিক্স ১ম ও ২য় পত্র", syllabus: "১ম পত্র: অধ্যায় ৮–১০ · ২য় পত্র: অধ্যায় ১–৪", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1008", enabled: true },
  { id: 9,  date: "2026-11-23", group: G1, title: "টপিক এক্সাম ৯", subject: "ফিজিক্স ২য় পত্র", syllabus: "অধ্যায় ৫–১১", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1009", enabled: true },

  // ---- Paper Final & Subject Final ----
  { id: 10, date: "2026-11-24", group: G2, title: "বোটানি পেপার ফাইনাল", subject: "বোটানি", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1010", enabled: true },
  { id: 11, date: "2026-11-25", group: G2, title: "জুওলজি পেপার ফাইনাল", subject: "জুওলজি", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1011", enabled: true },
  { id: 12, date: "2026-11-26", group: G2, title: "বায়োলজি সাবজেক্ট ফাইনাল", subject: "বায়োলজি", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1012", enabled: true },
  { id: 13, date: "2026-11-27", group: G2, title: "কেমিস্ট্রি ১ম পত্র পেপার ফাইনাল", subject: "কেমিস্ট্রি ১ম পত্র", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1013", enabled: true },
  { id: 14, date: "2026-11-28", group: G2, title: "কেমিস্ট্রি ২য় পত্র পেপার ফাইনাল", subject: "কেমিস্ট্রি ২য় পত্র", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1014", enabled: true },
  { id: 15, date: "2026-11-29", group: G2, title: "কেমিস্ট্রি সাবজেক্ট ফাইনাল", subject: "কেমিস্ট্রি", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1015", enabled: true },
  { id: 16, date: "2026-11-30", group: G2, title: "ইংলিশ সাবজেক্ট ফাইনাল", subject: "ইংলিশ", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1016", enabled: true },
  { id: 17, date: "2026-12-01", group: G2, title: "GK সাবজেক্ট ফাইনাল", subject: "GK", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1017", enabled: true },
  { id: 18, date: "2026-12-02", group: G2, title: "ইংলিশ + GK সাবজেক্ট ফাইনাল", subject: "ইংলিশ + GK", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1018", enabled: true },
  { id: 19, date: "2026-12-03", group: G2, title: "ফিজিক্স ১ম পত্র পেপার ফাইনাল", subject: "ফিজিক্স ১ম পত্র", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1019", enabled: true },
  { id: 20, date: "2026-12-04", group: G2, title: "ফিজিক্স ২য় পত্র পেপার ফাইনাল", subject: "ফিজিক্স ২য় পত্র", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1020", enabled: true },
  { id: 21, date: "2026-12-05", group: G2, title: "ফিজিক্স সাবজেক্ট ফাইনাল", subject: "ফিজিক্স", startTime: "10:00", duration: 60, examLink: "https://testmoz.com/1021", enabled: true },

  // ---- Model Tests ----
  { id: 22, date: "2026-12-06", group: G3, title: "মডেল টেস্ট ১",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1022", enabled: true },
  { id: 23, date: "2026-12-07", group: G3, title: "মডেল টেস্ট ২",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1023", enabled: true },
  { id: 24, date: "2026-12-08", group: G3, title: "মডেল টেস্ট ৩",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1024", enabled: true },
  { id: 25, date: "2026-12-09", group: G3, title: "মডেল টেস্ট ৪",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1025", enabled: true },
  { id: 26, date: "2026-12-10", group: G3, title: "মডেল টেস্ট ৫",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1026", enabled: true },
  { id: 27, date: "2026-12-11", group: G3, title: "মডেল টেস্ট ৬",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1027", enabled: true },
  { id: 28, date: "2026-12-12", group: G3, title: "মডেল টেস্ট ৭",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1028", enabled: true },
  { id: 29, date: "2026-12-13", group: G3, title: "মডেল টেস্ট ৮",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1029", enabled: true },
  { id: 30, date: "2026-12-14", group: G3, title: "মডেল টেস্ট ৯",  subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1030", enabled: true },
  { id: 31, date: "2026-12-15", group: G3, title: "মডেল টেস্ট ১০", subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1031", enabled: true },
  { id: 32, date: "2026-12-16", group: G3, title: "মডেল টেস্ট ১১", subject: "সকল বিষয়", startTime: "10:00", duration: 90, examLink: "https://testmoz.com/1032", enabled: true }
];
