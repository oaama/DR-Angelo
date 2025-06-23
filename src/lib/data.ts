
import type { Doctor, Patient, Ad } from './types';

// This is a static data source.
// Replace this with your actual backend API calls.

export const doctors: Doctor[] = [
    {
        id: '1',
        name: 'د. محمد عبد السلام',
        email: 'mohamed.salam@example.com',
        gender: 'ذكر',
        specialty: 'قلب',
        city: 'القاهرة',
        phone: '01234567890',
        rating: 4.8,
        reviews: 120,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'استشاري أمراض القلب والقسطرة العلاجية. خبرة أكثر من 15 عامًا في علاج أمراض الشرايين التاجية.',
        subscription: { tier: 'مميز', status: 'نشط' },
        verificationStatus: 'verified',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-05-01',
        comments: [
            { id: 'c1', patientName: 'أحمد علي', rating: 5, text: 'طبيب ممتاز وشرحه وافي.', date: '2024-05-10' },
            { id: 'c2', patientName: 'فاطمة محمود', rating: 4, text: 'تجربة جيدة بشكل عام.', date: '2024-05-08' },
        ]
    },
    {
        id: '2',
        name: 'د. فاطمة الزهراء',
        email: 'fatima.zahraa@example.com',
        gender: 'أنثى',
        specialty: 'جلدية',
        city: 'الجيزة',
        phone: '01234567891',
        rating: 4.9,
        reviews: 250,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'أخصائية الأمراض الجلدية والتجميل والليزر. متخصصة في علاج حب الشباب وآثار الندبات.',
        subscription: { tier: 'مميز', status: 'نشط' },
        verificationStatus: 'pending',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-05-15',
        comments: [
            { id: 'c3', patientName: 'سارة إبراهيم', rating: 5, text: 'النتائج كانت مذهلة! شكرًا دكتورة فاطمة.', date: '2024-05-12' },
        ]
    },
    {
        id: '3',
        name: 'د. علي حسن',
        email: 'ali.hassan@example.com',
        gender: 'ذكر',
        specialty: 'عظام',
        city: 'الإسكندرية',
        phone: '01234567892',
        rating: 4.7,
        reviews: 95,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'استشاري جراحة العظام والمفاصل. متخصص في إصابات الملاعب والخشونة.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        verificationStatus: 'verified',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-04-20',
        comments: []
    },
    {
        id: '4',
        name: 'د. هدى مصطفى',
        email: 'hoda.mustafa@example.com',
        gender: 'أنثى',
        specialty: 'أطفال',
        city: 'القاهرة',
        phone: '01234567893',
        rating: 5.0,
        reviews: 310,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'استشارية طب الأطفال وحديثي الولادة. خبرة واسعة في متابعة نمو وتطور الأطفال.',
        subscription: { tier: 'مميز', status: 'نشط' },
        verificationStatus: 'pending',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-05-18',
        comments: []
    },
    {
        id: '5',
        name: 'د. خالد رضوان',
        email: 'khaled.radwan@example.com',
        gender: 'ذكر',
        specialty: 'باطنة',
        city: 'المنصورة',
        phone: '01234567894',
        rating: 4.6,
        reviews: 150,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'أخصائي الأمراض الباطنة والجهاز الهضمي. تشخيص وعلاج أمراض السكر والضغط.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        verificationStatus: 'rejected',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-05-10',
        comments: []
    },
    {
        id: '6',
        name: 'د. رانيا الشناوي',
        email: 'rania.shenawy@example.com',
        gender: 'أنثى',
        specialty: 'نساء وتوليد',
        city: 'الجيزة',
        phone: '01234567895',
        rating: 4.9,
        reviews: 180,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'استشارية أمراض النساء والتوليد والحقن المجهري. متابعة حالات الحمل الحرج.',
        subscription: { tier: 'مميز', status: 'نشط' },
        verificationStatus: 'verified',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-03-11',
        comments: []
    },
    {
        id: '7',
        name: 'د. يوسف النجار',
        email: 'youssef.nagar@example.com',
        gender: 'ذكر',
        specialty: 'أنف وأذن وحنجرة',
        city: 'طنطا',
        phone: '01234567896',
        rating: 4.5,
        reviews: 88,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'أخصائي أمراض الأنف والأذن والحنجرة. متخصص في عمليات الجيوب الأنفية بالمنظار.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        verificationStatus: 'verified',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-02-15',
        comments: [
            { id: 'c4', patientName: 'كريم عادل', rating: 5, text: 'طبيب محترف ومريح في التعامل.', date: '2024-04-22' },
        ]
    },
    {
        id: '8',
        name: 'د. نورهان السيد',
        email: 'nourhan.sayed@example.com',
        gender: 'أنثى',
        specialty: 'عيون',
        city: 'أسيوط',
        phone: '01234567897',
        rating: 4.8,
        reviews: 160,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'استشارية طب وجراحة العيون وتصحيح الإبصار بالليزر. خبرة في علاج المياه البيضاء والزرقاء.',
        subscription: { tier: 'مميز', status: 'نشط' },
        verificationStatus: 'verified',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-01-30',
        comments: [
            { id: 'c5', patientName: 'منى فتحي', rating: 5, text: 'عملية الليزك كانت ناجحة جدًا، أنصح بها بشدة.', date: '2024-03-18' },
            { id: 'c6', patientName: 'طارق شوقي', rating: 5, text: 'أفضل طبيبة عيون تعاملت معها.', date: '2024-03-20' },
        ]
    },
    {
        id: '9',
        name: 'د. عمر الشريف',
        email: 'omar.sherif@example.com',
        gender: 'ذكر',
        specialty: 'نفسية',
        city: 'القاهرة',
        phone: '01234567898',
        rating: 4.9,
        reviews: 210,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'طبيب ومعالج نفسي متخصص في علاج الاكتئاب والقلق. يقدم جلسات فردية وأسرية.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        verificationStatus: 'pending',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-05-20',
        comments: []
    },
    {
        id: '10',
        name: 'د. آية محفوظ',
        email: 'aya.mahfouz@example.com',
        gender: 'أنثى',
        specialty: 'أسنان',
        city: 'الجيزة',
        phone: '01234567899',
        rating: 4.7,
        reviews: 135,
        profilePicture: 'https://placehold.co/200.png',
        bio: 'أخصائية طب وتجميل الأسنان. خبرة في تبييض الأسنان وابتسامة هوليود.',
        subscription: { tier: 'أساسي', status: 'نشط' },
        verificationStatus: 'verified',
        idCardImage: 'https://placehold.co/400x250.png',
        submissionDate: '2024-04-05',
        comments: [
            { id: 'c7', patientName: 'وليد توفيق', rating: 4, text: 'العيادة نظيفة والتعامل جيد.', date: '2024-05-01' },
        ]
    }
];

export const ads: Ad[] = [
    {
        id: 'ad1',
        type: 'image',
        title: 'أفضل عروض عيادات الليزر',
        description: 'خصومات تصل إلى 50% على جلسات إزالة الشعر بالليزر. احجز الآن واستمتع ببشرة ناعمة!',
        imageUrl: 'https://placehold.co/600x400.png',
        link: '#',
        placement: 'homepage-sidebar',
        status: 'active',
    },
    {
        id: 'ad2',
        type: 'text',
        title: 'استشارة مجانية',
        description: 'احصل على استشارة أولية مجانية عند حجزك مع أي طبيب نفسي هذا الشهر.',
        imageUrl: null,
        link: '#',
        placement: 'search-results',
        status: 'active',
    },
     {
        id: 'ad3',
        type: 'image',
        title: 'خصم خاص على تبييض الأسنان',
        description: 'ابتسامة هوليود بين يديك بخصم 25%.',
        imageUrl: 'https://placehold.co/600x400.png',
        link: '#',
        placement: 'homepage-sidebar',
        status: 'expired',
    },
];

export const patients: Patient[] = [
    { id: 'p1', name: 'أحمد علي', email: 'ahmed.ali@email.com', joinDate: '2024-05-20', userType: 'patient' },
    { id: 'p2', name: 'سارة إبراهيم', email: 'sara.ibrahim@email.com', joinDate: '2024-05-21', userType: 'patient' },
    { id: 'p3', name: 'محمود خالد', email: 'mahmoud.k@email.com', joinDate: '2024-05-22', userType: 'patient' },
    { id: 'p4', name: 'هند رضا', email: 'hind.reda@email.com', joinDate: '2024-05-23', userType: 'patient' },
];


export async function getDoctors(
  filters: {
    specialty?: string;
    city?: string;
    gender?: string;
  },
  userGender?: 'ذكر' | 'أنثى'
): Promise<Doctor[]> {
  
  let doctorsToShow = [...doctors].filter(d => d.verificationStatus === 'verified');

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

export async function getDoctorById(id: string, bypassVerificationCheck = false): Promise<Doctor | undefined> {
  const doctor = doctors.find(d => d.id === id);
  if (!doctor) {
      return undefined;
  }

  // For the doctor's own profile view, we can bypass the verification check.
  if (bypassVerificationCheck) {
      return doctor;
  }

  // For public views, only return verified doctors.
  if (doctor.verificationStatus === 'verified') {
      return doctor;
  }

  return undefined;
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

export async function getActiveAds(placement: Ad['placement']): Promise<Ad[]> {
  const placementAds = ads.filter(ad => ad.status === 'active' && ad.placement === placement);
  return placementAds;
}
