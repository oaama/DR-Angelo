import type { Doctor } from './types';

// This is a static data source.
// Replace this with your actual backend API calls.

export const doctors: Doctor[] = [
    {
        id: '1',
        name: 'د. محمد عبد السلام',
        gender: 'ذكر',
        specialty: 'قلب',
        city: 'القاهرة',
        rating: 4.8,
        reviews: 120,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشاري أمراض القلب والقسطرة العلاجية. خبرة أكثر من 15 عامًا في علاج أمراض الشرايين التاجية.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: [
            { id: 'c1', patientName: 'أحمد علي', rating: 5, text: 'طبيب ممتاز وشرحه وافي.', date: '2024-05-10' },
            { id: 'c2', patientName: 'فاطمة محمود', rating: 4, text: 'تجربة جيدة بشكل عام.', date: '2024-05-08' },
        ]
    },
    {
        id: '2',
        name: 'د. فاطمة الزهراء',
        gender: 'أنثى',
        specialty: 'جلدية',
        city: 'الجيزة',
        rating: 4.9,
        reviews: 250,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائية الأمراض الجلدية والتجميل والليزر. متخصصة في علاج حب الشباب وآثار الندبات.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: [
            { id: 'c3', patientName: 'سارة إبراهيم', rating: 5, text: 'النتائج كانت مذهلة! شكرًا دكتورة فاطمة.', date: '2024-05-12' },
        ]
    },
    {
        id: '3',
        name: 'د. علي حسن',
        gender: 'ذكر',
        specialty: 'عظام',
        city: 'الإسكندرية',
        rating: 4.7,
        reviews: 95,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشاري جراحة العظام والمفاصل. متخصص في إصابات الملاعب والخشونة.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    },
    {
        id: '4',
        name: 'د. هدى مصطفى',
        gender: 'أنثى',
        specialty: 'أطفال',
        city: 'القاهرة',
        rating: 5.0,
        reviews: 310,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشارية طب الأطفال وحديثي الولادة. خبرة واسعة في متابعة نمو وتطور الأطفال.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: []
    },
    {
        id: '5',
        name: 'د. خالد رضوان',
        gender: 'ذكر',
        specialty: 'باطنة',
        city: 'المنصورة',
        rating: 4.6,
        reviews: 150,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائي الأمراض الباطنة والجهاز الهضمي. تشخيص وعلاج أمراض السكر والضغط.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    },
    {
        id: '6',
        name: 'د. رانيا الشناوي',
        gender: 'أنثى',
        specialty: 'نساء وتوليد',
        city: 'الجيزة',
        rating: 4.9,
        reviews: 180,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشارية أمراض النساء والتوليد والحقن المجهري. متابعة حالات الحمل الحرج.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: []
    },
    {
        id: '7',
        name: 'د. أحمد شوقي',
        gender: 'ذكر',
        specialty: 'مسالك بولية',
        city: 'أسيوط',
        rating: 4.5,
        reviews: 70,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائي جراحة المسالك البولية وأمراض الذكورة.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    },
    {
        id: '8',
        name: 'د. نادية حمدي',
        gender: 'أنثى',
        specialty: 'عيون',
        city: 'القاهرة',
        rating: 4.8,
        reviews: 220,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشارية طب وجراحة العيون وتصحيح الإبصار بالليزك.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: []
    },
     {
        id: '9',
        name: 'د. يوسف القاضي',
        gender: 'ذكر',
        specialty: 'أنف وأذن وحنجرة',
        city: 'طنطا',
        rating: 4.7,
        reviews: 130,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشاري الأنف والأذن والحنجرة وجراحات تجميل الأنف.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    },
    {
        id: '10',
        name: 'د. منى عبد الرحمن',
        gender: 'أنثى',
        specialty: 'تغذية',
        city: 'الجيزة',
        rating: 4.9,
        reviews: 190,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائية التغذية العلاجية وعلاج السمنة والنحافة.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: []
    },
    {
        id: '11',
        name: 'د. شريف حمدي',
        gender: 'ذكر',
        specialty: 'أسنان',
        city: 'الإسكندرية',
        rating: 4.8,
        reviews: 280,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشاري تجميل وزراعة الأسنان. أحدث تقنيات تبييض الأسنان.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: []
    },
    {
        id: '12',
        name: 'د. إيمان سالم',
        gender: 'أنثى',
        specialty: 'نفسية',
        city: 'القاهرة',
        rating: 4.9,
        reviews: 160,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'استشارية الطب النفسي وعلاج الإدمان. جلسات علاج سلوكي ومعرفي.',
        subscription: { tier: 'مميز', status: 'نشط' },
        comments: []
    },
    {
        id: '13',
        name: 'د. كريم فهمي',
        gender: 'ذكر',
        specialty: 'علاج طبيعي',
        city: 'الزقازيق',
        rating: 4.6,
        reviews: 85,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائي العلاج الطبيعي والتأهيل. متخصص في تأهيل إصابات العمود الفقري.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    },
    {
        id: '14',
        name: 'د. آية محمود',
        gender: 'أنثى',
        specialty: 'جلدية',
        city: 'الإسماعيلية',
        rating: 4.8,
        reviews: 110,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائية الجلدية والتجميل. جلسات نضارة البشرة وإزالة الشعر بالليزر.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    },
    {
        id: '15',
        name: 'د. حسام البدري',
        gender: 'ذكر',
        specialty: 'عظام',
        city: 'أسوان',
        rating: 4.7,
        reviews: 60,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائي جراحة العظام والمفاصل الصناعية.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    },
    {
        id: '16',
        name: 'د. مروة السيد',
        gender: 'أنثى',
        specialty: 'أطفال',
        city: 'الأقصر',
        rating: 4.9,
        reviews: 90,
        profilePicture: 'https://placehold.co/100x100.png',
        bio: 'أخصائية طب الأطفال وحديثي الولادة.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        comments: []
    }
];


export async function getDoctors(
  filters: {
    specialty?: string;
    city?: string;
    gender?: string;
  },
  userGender?: 'ذكر' | 'أنثى'
): Promise<Doctor[]> {
  
  let doctorsToShow = [...doctors];

  // Apply filters from the UI
  if (filters.specialty && filters.specialty !== 'all') {
    doctorsToShow = doctorsToShow.filter(d => d.specialty === filters.specialty);
  }
  if (filters.city && filters.city !== 'all') {
    doctorsToShow = doctorsToShow.filter(d => d.city === filters.city);
  }
  if (filters.gender && filters.gender !== 'all') {
    doctorsToShow = doctorsToShow.filter(d => d.gender === filters.gender);
  }

  // Apply custom sorting logic
  const noFiltersApplied = !filters.specialty && !filters.city && !filters.gender;

  doctorsToShow.sort((a, b) => {
    // 1. Sort by subscription tier first ('مميز' comes first)
    const tierOrder = { 'مميز': 1, 'احترافي': 1, 'أساسي': 2 };
    const tierA = tierOrder[a.subscription.tier] || 3;
    const tierB = tierOrder[b.subscription.tier] || 3;
    if (tierA !== tierB) {
      return tierA - tierB;
    }

    // 2. If user is female and no filters are applied, sort female doctors higher
    if (userGender === 'أنثى' && noFiltersApplied) {
      if (a.gender === 'أنثى' && b.gender !== 'أنثى') return -1;
      if (b.gender === 'أنثى' && a.gender !== 'أنثى') return 1;
    }

    // 3. As a final tie-breaker, sort by rating
    return b.rating - a.rating;
  });

  return doctorsToShow;
}

export async function getDoctorById(id: string): Promise<Doctor | undefined> {
  return doctors.find(doctor => doctor.id === id);
}

export async function getUniqueSpecialties(): Promise<string[]> {
  // For performance, this is now a hardcoded list.
  // In a real app, you might get this list from its own API endpoint.
  const specialties = [
    "قلب", "جلدية", "عظام", "أعصاب", "أطفال", "باطنة", "نساء وتوليد", 
    "مسالك بولية", "عيون", "أنف وأذن وحنجرة", "تغذية", "أسنان", "نفسية", 
    "علاج طبيعي", "غدد صماء", "جراحة عامة", "أورام", "أمراض صدرية"
  ];
  return specialties.sort((a, b) => a.localeCompare(b, 'ar'));
}

export async function getUniqueCities(): Promise<string[]> {
  const governorates = [
    "الإسكندرية", "الإسماعيلية", "الأقصر", "البحر الأحمر", "البحيرة",
    "الجيزة", "الدقهلية", "السويس", "الشرقية", "الغربية", "الفيوم",
    "القاهرة", "القليوبية", "المنوفية", "المنيا", "الوادي الجديد", "أسوان",
    "أسيوط", "بني سويف", "بورسعيد", "جنوب سيناء", "دمياط", "سوهاج",
    "شمال سيناء", "قنا", "كفر الشيخ", "مطروح",
  ];
  return governorates.sort((a, b) => a.localeCompare(b, 'ar'));
}
