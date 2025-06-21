import type { Doctor } from './types';
import { db } from './firebase';
import { collection, query, where, getDocs, doc, getDoc, QueryConstraint } from 'firebase/firestore';


export async function getDoctors(
  filters: {
    specialty?: string;
    city?: string;
    gender?: string;
  },
  userGender?: 'ذكر' | 'أنثى'
): Promise<Doctor[]> {
  // This function now fetches from Firestore
  try {
    const doctorsCollection = collection(db, 'doctors');
    const constraints: QueryConstraint[] = [];

    // Apply filters from the UI
    if (filters.specialty && filters.specialty !== 'all') {
      constraints.push(where('specialty', '==', filters.specialty));
    }
    if (filters.city && filters.city !== 'all') {
      constraints.push(where('city', '==', filters.city));
    }
    if (filters.gender && filters.gender !== 'all') {
      constraints.push(where('gender', '==', filters.gender));
    }

    const q = query(doctorsCollection, ...constraints);
    const querySnapshot = await getDocs(q);

    const doctorsToShow: Doctor[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
    
    // After fetching, we apply the custom sorting logic in JavaScript
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

  } catch (error) {
    console.error("Error fetching doctors from Firestore:", error);
    console.log("NOTE: This error might be due to a missing Firestore index. The console error message from Firebase usually includes a link to create the required index automatically. Please check the browser console or server logs.");
    return [];
  }
}

export async function getDoctorById(id: string): Promise<Doctor | undefined> {
  // This function now fetches a single document from Firestore
  try {
    const docRef = doc(db, "doctors", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Doctor;
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching doctor by ID from Firestore:", error);
    return undefined;
  }
}

export async function getUniqueSpecialties(): Promise<string[]> {
  // For performance, this is now a hardcoded list.
  // In a real app, you might manage this list in a separate Firestore document.
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
