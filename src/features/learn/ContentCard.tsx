import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, FileText, BookOpen, Clock, ArrowRight } from "lucide-react";

interface ContentCardProps {
  id: string;
  title: string;
  titleHindi?: string;
  contentType: "video" | "article" | "tutorial";
  category: string;
  description: string;
  duration?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  language: "en" | "hi";
  onView: (id: string) => void;
}

const contentIcons = {
  video: Video,
  article: FileText,
  tutorial: BookOpen,
};

const difficultyColors = {
  beginner: "bg-accent text-accent-foreground",
  intermediate: "bg-gold text-gold-foreground",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function ContentCard({
  id,
  title,
  titleHindi,
  contentType,
  category,
  description,
  duration,
  difficulty,
  language,
  onView,
}: ContentCardProps) {
  const Icon = contentIcons[contentType];
  const displayTitle = language === "hi" && titleHindi ? titleHindi : title;

  return (
    <Card className="hover-elevate h-full flex flex-col" data-testid={`card-content-${id}`}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="secondary" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">
          {displayTitle}
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {duration} min
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => onView(id)}
          data-testid={`button-view-content-${id}`}
        >
          {language === "hi" ? "देखें" : "View Content"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
