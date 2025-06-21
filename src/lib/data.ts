import type { Doctor } from './types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'د. أحمد محمود',
    gender: 'ذكر',
    specialty: 'قلب',
    city: 'القاهرة',
    rating: 4.8,
    reviews: 124,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'د. أحمد استشاري أمراض القلب بخبرة تزيد عن 15 عامًا في علاج أمراض القلب.',
  },
  {
    id: '2',
    name: 'د. فاطمة علي',
    gender: 'أنثى',
    specialty: 'جلدية',
    city: 'الإسكندرية',
    rating: 4.9,
    reviews: 210,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'متخصصة في الأمراض الجلدية التجميلية والطبية، د. فاطمة رائدة في علاجات العناية بالبشرة المبتكرة.',
  },
  {
    id: '3',
    name: 'د. محمد إبراهيم',
    gender: 'ذكر',
    specialty: 'عظام',
    city: 'الجيزة',
    rating: 4.7,
    reviews: 98,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'يركز د. محمد على الطب الرياضي واستبدال المفاصل، مما يساعد المرضى على استعادة الحركة والعيش بدون ألم.',
  },
  {
    id: '4',
    name: 'د. ياسمين خالد',
    gender: 'أنثى',
    specialty: 'أعصاب',
    city: 'أسوان',
    rating: 4.6,
    reviews: 85,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'تشتهر د. ياسمين بعملها في الأمراض العصبية التنكسية وأبحاثها المتطورة في صحة الدماغ.',
  },
  {
    id: '5',
    name: 'د. علي حسن',
    gender: 'ذكر',
    specialty: 'أطفال',
    city: 'الدقهلية',
    rating: 5.0,
    reviews: 350,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'بشغف لصحة الأطفال، يقدم د. علي رعاية رحيمة وشاملة للرضع والمراهقين.',
  },
  {
    id: '6',
    name: 'د. سارة عبد الرحمن',
    gender: 'أنثى',
    specialty: 'قلب',
    city: 'الغربية',
    rating: 4.7,
    reviews: 150,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'د. سارة طبيبة قلب متفانية تركز على الرعاية الوقائية وإدارة أمراض القلب المزمنة.',
  },
  {
    id: '7',
    name: 'د. عمر الشريف',
    gender: 'ذكر',
    specialty: 'جلدية',
    city: 'السويس',
    rating: 4.8,
    reviews: 180,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'يقدم د. عمر مجموعة واسعة من الخدمات الجلدية مع التركيز على تثقيف المرضى والرعاية الشخصية.',
  },
  {
    id: '8',
    name: 'د. هناء مصطفى',
    gender: 'أنثى',
    specialty: 'عظام',
    city: 'الشرقية',
    rating: 4.9,
    reviews: 132,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'جرّاحة عظام رائدة، تشتهر د. هناء بخبرتها في التقنيات الجراحية طفيفة التوغل.',
  },
  {
    id: '9',
    name: 'د. خالد سعيد',
    gender: 'ذكر',
    specialty: 'أعصاب',
    city: 'المنيا',
    rating: 4.5,
    reviews: 77,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'يتخصص د. خالد في الصرع واضطرابات النوم، باستخدام أحدث تقنيات التشخيص.',
  },
  {
    id: '10',
    name: 'د. نورهان أيمن',
    gender: 'أنثى',
    specialty: 'أطفال',
    city: 'أسيوط',
    rating: 4.9,
    reviews: 280,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'د. نورهان طبيبة أطفال محبوبة معروفة بسلوكها الودود والتزامها بالرعاية المرتكزة على الأسرة.',
  },
  {
    id: '11',
    name: 'د. طارق شوقي',
    gender: 'ذكر',
    specialty: 'باطنة',
    city: 'بورسعيد',
    rating: 4.8,
    reviews: 110,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'استشاري أمراض باطنة بخبرة واسعة في تشخيص وعلاج الأمراض المعقدة.',
  },
  {
    id: '12',
    name: 'د. منى حمدي',
    gender: 'أنثى',
    specialty: 'نساء وتوليد',
    city: 'الأقصر',
    rating: 4.9,
    reviews: 195,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'متخصصة في صحة المرأة، تقدم د. منى رعاية شاملة خلال جميع مراحل الحياة.',
  },
  {
    id: '13',
    name: 'د. شريف رمزي',
    gender: 'ذكر',
    specialty: 'مسالك بولية',
    city: 'سوهاج',
    rating: 4.7,
    reviews: 95,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'يقدم د. شريف أحدث العلاجات لمشاكل المسالك البولية مع التركيز على راحة المريض.',
  },
  {
    id: '14',
    name: 'د. هبة رشوان',
    gender: 'أنثى',
    specialty: 'عيون',
    city: 'قنا',
    rating: 4.8,
    reviews: 140,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'جرّاحة عيون ماهرة، متخصصة في جراحات الليزك وعلاج أمراض الشبكية.',
  },
  {
    id: '15',
    name: 'د. وائل غنيم',
    gender: 'ذكر',
    specialty: 'أنف وأذن وحنجرة',
    city: 'بني سويف',
    rating: 4.6,
    reviews: 88,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'متخصص في علاج اضطرابات السمع ومشاكل الجيوب الأنفية.',
  },
  {
    id: '16',
    name: 'د. ريهام عبد الغفور',
    gender: 'أنثى',
    specialty: 'تغذية',
    city: 'كفر الشيخ',
    rating: 4.9,
    reviews: 250,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'تساعد د. ريهام المرضى على تحقيق أهدافهم الصحية من خلال خطط تغذية شخصية.',
  },
  {
    id: '17',
    name: 'د. كريم فهمي',
    gender: 'ذكر',
    specialty: 'أسنان',
    city: 'دمياط',
    rating: 4.8,
    reviews: 188,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'يقدم د. كريم خدمات طب الأسنان التجميلي والترميمي بأحدث التقنيات.',
  },
  {
    id: '18',
    name: 'د. دينا الشربيني',
    gender: 'أنثى',
    specialty: 'نفسية',
    city: 'الإسماعيلية',
    rating: 4.7,
    reviews: 121,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'توفر د. دينا دعماً نفسياً وعلاجاً لمختلف الاضطرابات النفسية في بيئة آمنة.',
  },
  {
    id: '19',
    name: 'د. عمرو يوسف',
    gender: 'ذكر',
    specialty: 'علاج طبيعي',
    city: 'البحيرة',
    rating: 4.9,
    reviews: 165,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'متخصص في إعادة التأهيل بعد الإصابات الرياضية والجراحات.',
  },
  {
    id: '20',
    name: 'د. حنان مطاوع',
    gender: 'أنثى',
    specialty: 'غدد صماء',
    city: 'القليوبية',
    rating: 4.8,
    reviews: 130,
    profilePicture: 'https://placehold.co/400x400',
    bio: 'خبيرة في علاج اضطرابات الغدد الصماء والسكري.',
  },
];

export async function getDoctors(filters: {
  specialty?: string;
  city?: string;
  gender?: string;
}): Promise<Doctor[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredDoctors = doctors;

  if (filters.specialty && filters.specialty !== 'all') {
    filteredDoctors = filteredDoctors.filter(
      (doctor) => doctor.specialty === filters.specialty
    );
  }

  if (filters.city && filters.city !== 'all') {
    filteredDoctors = filteredDoctors.filter(
      (doctor) => doctor.city === filters.city
    );
  }

  if (filters.gender && filters.gender !== 'all') {
    filteredDoctors = filteredDoctors.filter(
      (doctor) => doctor.gender === filters.gender
    );
  }

  return filteredDoctors;
}

export async function getUniqueSpecialties(): Promise<string[]> {
  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];
  return specialties.sort((a, b) => a.localeCompare(b, 'ar'));
}

export async function getUniqueCities(): Promise<string[]> {
  const governorates = [
    'القاهرة',
    'الجيزة',
    'الإسكندرية',
    'الدقهلية',
    'البحر الأحمر',
    'البحيرة',
    'الفيوم',
    'الغربية',
    'الإسماعيلية',
    'المنوفية',
    'المنيا',
    'القليوبية',
    'الوادي الجديد',
    'السويس',
    'أسوان',
    'أسيوط',
    'بني سويف',
    'بورسعيد',
    'دمياط',
    'الشرقية',
    'جنوب سيناء',
    'كفر الشيخ',
    'مطروح',
    'الأقصر',
    'قنا',
    'شمال سيناء',
    'سوهاج',
  ];
  return governorates.sort((a, b) => a.localeCompare(b, 'ar'));
}
