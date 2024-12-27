export type Subject = {
  id: string;
  name: string;
  examType: "TYT" | "AYT";
  topics: Topic[];
};

export type Topic = {
  id: string;
  name: string;
  subjectId: string;
  description?: string;
};

export const subjects: Subject[] = [
  {
    id: "mat-tyt",
    name: "Matematik",
    examType: "TYT",
    topics: [
      {
        id: "mat-tyt-temel",
        name: "Temel Kavramlar",
        subjectId: "mat-tyt",
        description: "Sayılar, Bölme-Bölünebilme, OBEB-OKEK"
      },
      {
        id: "mat-tyt-cebir",
        name: "Cebir",
        subjectId: "mat-tyt",
        description: "Birinci Dereceden Denklemler, Rasyonel Sayılar"
      },
      // ... diğer konular eklenecek
    ]
  },
  {
    id: "fiz-ayt",
    name: "Fizik",
    examType: "AYT",
    topics: [
      {
        id: "fiz-ayt-hareket",
        name: "Hareket ve Kuvvet",
        subjectId: "fiz-ayt",
        description: "Vektörler, Newton'un Hareket Kanunları"
      },
      // ... diğer konular eklenecek
    ]
  },
  // ... diğer dersler eklenecek
];