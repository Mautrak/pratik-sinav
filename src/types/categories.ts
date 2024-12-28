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
      {
        id: "mat-tyt-sayisal",
        name: "Sayısal Mantık",
        subjectId: "mat-tyt",
        description: "Sayı-Kesir Problemleri, Yaş Problemleri"
      },
      {
        id: "mat-tyt-oran",
        name: "Oran-Orantı",
        subjectId: "mat-tyt",
        description: "Doğru ve Ters Orantı, Yüzde Problemleri"
      },
      {
        id: "mat-tyt-geometri",
        name: "Temel Geometri",
        subjectId: "mat-tyt",
        description: "Üçgenler, Dörtgenler, Çokgenler"
      }
    ]
  },
  {
    id: "turkce-tyt",
    name: "Türkçe",
    examType: "TYT",
    topics: [
      {
        id: "turkce-tyt-dil",
        name: "Dil Bilgisi",
        subjectId: "turkce-tyt",
        description: "Ses Bilgisi, Yapı Bilgisi, Sözcük Türleri"
      },
      {
        id: "turkce-tyt-anlam",
        name: "Anlam Bilgisi",
        subjectId: "turkce-tyt",
        description: "Sözcükte ve Cümlede Anlam, Anlatım Bozuklukları"
      },
      {
        id: "turkce-tyt-paragraf",
        name: "Paragraf",
        subjectId: "turkce-tyt",
        description: "Ana Düşünce, Yardımcı Düşünce, Paragraf Yapısı"
      }
    ]
  },
  {
    id: "fizik-tyt",
    name: "Fizik",
    examType: "TYT",
    topics: [
      {
        id: "fizik-tyt-madde",
        name: "Madde ve Özellikleri",
        subjectId: "fizik-tyt",
        description: "Kütle, Hacim, Özkütle"
      },
      {
        id: "fizik-tyt-hareket",
        name: "Hareket ve Kuvvet",
        subjectId: "fizik-tyt",
        description: "Sürat, İvme, Newton Kanunları"
      },
      {
        id: "fizik-tyt-enerji",
        name: "Enerji",
        subjectId: "fizik-tyt",
        description: "İş, Güç, Enerji Dönüşümleri"
      }
    ]
  },
  {
    id: "kimya-tyt",
    name: "Kimya",
    examType: "TYT",
    topics: [
      {
        id: "kimya-tyt-madde",
        name: "Maddenin Yapısı",
        subjectId: "kimya-tyt",
        description: "Atom, Periyodik Sistem, Kimyasal Bağlar"
      },
      {
        id: "kimya-tyt-karisim",
        name: "Karışımlar",
        subjectId: "kimya-tyt",
        description: "Homojen ve Heterojen Karışımlar, Ayırma Teknikleri"
      },
      {
        id: "kimya-tyt-reaksiyon",
        name: "Kimyasal Tepkimeler",
        subjectId: "kimya-tyt",
        description: "Tepkime Çeşitleri, Mol Kavramı"
      }
    ]
  },
  {
    id: "biyoloji-tyt",
    name: "Biyoloji",
    examType: "TYT",
    topics: [
      {
        id: "biyoloji-tyt-hucre",
        name: "Hücre",
        subjectId: "biyoloji-tyt",
        description: "Hücre Yapısı, Organeller, Hücre Zarı"
      },
      {
        id: "biyoloji-tyt-canli",
        name: "Canlılar Dünyası",
        subjectId: "biyoloji-tyt",
        description: "Canlıların Sınıflandırılması, Canlı Çeşitliliği"
      },
      {
        id: "biyoloji-tyt-sistem",
        name: "Sistemler",
        subjectId: "biyoloji-tyt",
        description: "Sindirim, Dolaşım, Solunum Sistemleri"
      }
    ]
  },
  {
    id: "tarih-tyt",
    name: "Tarih",
    examType: "TYT",
    topics: [
      {
        id: "tarih-tyt-ilk",
        name: "İlk Uygarlıklar",
        subjectId: "tarih-tyt",
        description: "Mezopotamya, Anadolu, Mısır Uygarlıkları"
      },
      {
        id: "tarih-tyt-turk",
        name: "İlk Türk Devletleri",
        subjectId: "tarih-tyt",
        description: "Hunlar, Göktürkler, Uygurlar"
      },
      {
        id: "tarih-tyt-osmanli",
        name: "Osmanlı Tarihi",
        subjectId: "tarih-tyt",
        description: "Kuruluş, Yükseliş, Duraklama Dönemleri"
      }
    ]
  },
  {
    id: "cografya-tyt",
    name: "Coğrafya",
    examType: "TYT",
    topics: [
      {
        id: "cografya-tyt-dunya",
        name: "Dünya'nın Şekli ve Hareketleri",
        subjectId: "cografya-tyt",
        description: "Paralel, Meridyen, Koordinat Sistemi"
      },
      {
        id: "cografya-tyt-iklim",
        name: "İklim Bilgisi",
        subjectId: "cografya-tyt",
        description: "İklim Elemanları, İklim Tipleri"
      },
      {
        id: "cografya-tyt-turkiye",
        name: "Türkiye'nin Coğrafi Özellikleri",
        subjectId: "cografya-tyt",
        description: "Yer Şekilleri, İklimi, Bitki Örtüsü"
      }
    ]
  },
  // AYT Dersleri
  {
    id: "mat-ayt",
    name: "Matematik",
    examType: "AYT",
    topics: [
      {
        id: "mat-ayt-fonk",
        name: "Fonksiyonlar",
        subjectId: "mat-ayt",
        description: "Fonksiyon Çeşitleri, Fonksiyonlarda İşlemler"
      },
      {
        id: "mat-ayt-turev",
        name: "Türev",
        subjectId: "mat-ayt",
        description: "Limit, Süreklilik, Türev Alma Kuralları"
      },
      {
        id: "mat-ayt-integral",
        name: "İntegral",
        subjectId: "mat-ayt",
        description: "Belirsiz İntegral, Belirli İntegral, Alan Hesabı"
      }
    ]
  },
  {
    id: "fizik-ayt",
    name: "Fizik",
    examType: "AYT",
    topics: [
      {
        id: "fizik-ayt-elektrik",
        name: "Elektrik ve Manyetizma",
        subjectId: "fizik-ayt",
        description: "Elektrik Alan, Manyetik Alan, İndüksiyon"
      },
      {
        id: "fizik-ayt-dalga",
        name: "Dalgalar",
        subjectId: "fizik-ayt",
        description: "Ses Dalgaları, Elektromanyetik Dalgalar"
      },
      {
        id: "fizik-ayt-modern",
        name: "Modern Fizik",
        subjectId: "fizik-ayt",
        description: "Özel Görelilik, Kuantum Fiziği"
      }
    ]
  },
  {
    id: "kimya-ayt",
    name: "Kimya",
    examType: "AYT",
    topics: [
      {
        id: "kimya-ayt-reaksiyon",
        name: "Kimyasal Tepkimelerde Denge",
        subjectId: "kimya-ayt",
        description: "Denge Sabiti, Le Chatelier Prensibi"
      },
      {
        id: "kimya-ayt-asit",
        name: "Asitler ve Bazlar",
        subjectId: "kimya-ayt",
        description: "pH, pOH, Tampon Çözeltiler"
      },
      {
        id: "kimya-ayt-organik",
        name: "Organik Kimya",
        subjectId: "kimya-ayt",
        description: "Hidrokarbonlar, Alkoller, Eterler"
      }
    ]
  },
  {
    id: "biyoloji-ayt",
    name: "Biyoloji",
    examType: "AYT",
    topics: [
      {
        id: "biyoloji-ayt-genetik",
        name: "Kalıtım",
        subjectId: "biyoloji-ayt",
        description: "Mendel Genetiği, Kan Grupları, DNA"
      },
      {
        id: "biyoloji-ayt-bitki",
        name: "Bitki Biyolojisi",
        subjectId: "biyoloji-ayt",
        description: "Bitkilerde Beslenme, Büyüme, Hareket"
      },
      {
        id: "biyoloji-ayt-evrim",
        name: "Evrim",
        subjectId: "biyoloji-ayt",
        description: "Evrim Teorisi, Popülasyon Genetiği"
      }
    ]
  },
  {
    id: "edebiyat-ayt",
    name: "Türk Dili ve Edebiyatı",
    examType: "AYT",
    topics: [
      {
        id: "edebiyat-ayt-divan",
        name: "Divan Edebiyatı",
        subjectId: "edebiyat-ayt",
        description: "Divan Şiiri, Edebi Sanatlar"
      },
      {
        id: "edebiyat-ayt-tanzimat",
        name: "Tanzimat ve Servet-i Fünun Edebiyatı",
        subjectId: "edebiyat-ayt",
        description: "Dönem Özellikleri, Önemli Eserler"
      },
      {
        id: "edebiyat-ayt-cumhuriyet",
        name: "Cumhuriyet Dönemi Edebiyatı",
        subjectId: "edebiyat-ayt",
        description: "Milli Edebiyat, Çağdaş Türk Edebiyatı"
      }
    ]
  },
  {
    id: "tarih-ayt",
    name: "Tarih",
    examType: "AYT",
    topics: [
      {
        id: "tarih-ayt-osmanli",
        name: "Osmanlı Tarihi (İleri Düzey)",
        subjectId: "tarih-ayt",
        description: "Reform Hareketleri, Dağılma Dönemi"
      },
      {
        id: "tarih-ayt-inkilap",
        name: "İnkılap Tarihi",
        subjectId: "tarih-ayt",
        description: "Kurtuluş Savaşı, Atatürk İlkeleri"
      },
      {
        id: "tarih-ayt-cagdas",
        name: "Çağdaş Türk ve Dünya Tarihi",
        subjectId: "tarih-ayt",
        description: "Soğuk Savaş, Küreselleşme"
      }
    ]
  },
  {
    id: "cografya-ayt",
    name: "Coğrafya",
    examType: "AYT",
    topics: [
      {
        id: "cografya-ayt-nufus",
        name: "Beşeri Coğrafya",
        subjectId: "cografya-ayt",
        description: "Nüfus, Göç, Yerleşme"
      },
      {
        id: "cografya-ayt-ekonomi",
        name: "Ekonomik Coğrafya",
        subjectId: "cografya-ayt",
        description: "Tarım, Sanayi, Ulaşım"
      },
      {
        id: "cografya-ayt-cevre",
        name: "Çevre ve Toplum",
        subjectId: "cografya-ayt",
        description: "Doğal Kaynaklar, Çevre Sorunları"
      }
    ]
  }
];