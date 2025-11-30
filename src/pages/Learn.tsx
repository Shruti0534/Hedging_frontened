import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ContentCard } from "@/components/learn/ContentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const mockContent = [
  {
    id: "1",
    title: "Introduction to Hedging",
    titleHindi: "हेजिंग का परिचय",
    contentType: "video" as const,
    category: "hedging",
    description: "Learn the basics of hedging and how it can protect your crop income from price volatility",
    duration: 12,
    difficulty: "beginner" as const,
  },
  {
    id: "2",
    title: "Understanding Futures Contracts",
    titleHindi: "फ्यूचर्स कॉन्ट्रैक्ट्स को समझना",
    contentType: "article" as const,
    category: "futures",
    description: "Deep dive into futures contracts, how they work, and when to use them for risk management",
    duration: 15,
    difficulty: "intermediate" as const,
  },
  {
    id: "3",
    title: "Options Trading Strategies",
    titleHindi: "ऑप्शंस ट्रेडिंग रणनीतियाँ",
    contentType: "tutorial" as const,
    category: "options",
    description: "Advanced strategies for using options to hedge your oilseed crops effectively",
    duration: 20,
    difficulty: "advanced" as const,
  },
  {
    id: "4",
    title: "Risk Management for Farmers",
    titleHindi: "किसानों के लिए जोखिम प्रबंधन",
    contentType: "video" as const,
    category: "risk-management",
    description: "Comprehensive guide to managing financial risks in agricultural commodity markets",
    duration: 18,
    difficulty: "beginner" as const,
  },
  {
    id: "5",
    title: "Forward Contracts Explained",
    titleHindi: "फॉरवर्ड कॉन्ट्रैक्ट्स की व्याख्या",
    contentType: "article" as const,
    category: "hedging",
    description: "How forward contracts work and how they differ from futures for oilseed farmers",
    duration: 10,
    difficulty: "beginner" as const,
  },
  {
    id: "6",
    title: "Price Discovery & Market Analysis",
    titleHindi: "मूल्य खोज और बाजार विश्लेषण",
    contentType: "tutorial" as const,
    category: "risk-management",
    description: "Learn to analyze market trends and discover fair prices for your crops",
    duration: 25,
    difficulty: "intermediate" as const,
  },
];

export default function Learn() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredContent = selectedCategory === "all"
    ? mockContent
    : mockContent.filter(c => c.category === selectedCategory);

  const handleViewContent = (id: string) => {
    console.log("View content:", id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("learn")}
        description="Educational resources on hedging and risk management"
      />

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-category-all">All</TabsTrigger>
          <TabsTrigger value="hedging" data-testid="tab-category-hedging">Hedging</TabsTrigger>
          <TabsTrigger value="futures" data-testid="tab-category-futures">Futures</TabsTrigger>
          <TabsTrigger value="options" data-testid="tab-category-options">Options</TabsTrigger>
          <TabsTrigger value="risk-management" data-testid="tab-category-risk">Risk Mgmt</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((content) => (
              <ContentCard
                key={content.id}
                {...content}
                language={language}
                onView={handleViewContent}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
