import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="font-medium"
      data-testid="button-language-toggle"
    >
      {language === 'en' ? 'हिन्दी' : 'English'}
    </Button>
  );
}
