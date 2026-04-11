// lib/constants.ts
import { LandingPageContent } from '@/types';

export const DEFAULT_LANDING_CONTENT: LandingPageContent = {
  heroTitle: "RSBE ACADEMY",
  heroSubtitle: "Managing Malaysia's future champions with a world-class digital syllabus, personalized video tracking, and elite performance analysis.",
  announcementText: "Elite Badminton Management",
  availablePrograms: [
    "Youth Development (6-12 Years)",
    "Junior Competitive (13-17 Years)",
    "Corporate Adult Training",
    "Private Elite Coaching"
  ],
  availableLocations: [
    "Stadium Alpha", "Kuala Lumpur Central", "Selangor Sports Complex"
  ]
};

// Kita buang MOCK_STUDENTS, MOCK_APPLICATIONS, dan TRANSACTIONS 
// sebab kita dah tak guna data statik ni lagi.
// Ini akan terus hilangkan semua ralat merah!