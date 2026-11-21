import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const alertFormSchema = z.object({
  cropType: z.enum(["mustard", "groundnut", "soybean", "sunflower"]),
  targetPrice: z.string().min(1, "Price is required"),
  condition: z.enum(["above", "below", "equals"]),
});

type AlertFormValues = z.infer<typeof alertFormSchema>;

interface AlertFormProps {
  onSubmit: (values: AlertFormValues) => void;
  onCancel: () => void;
}

export function AlertForm({ onSubmit, onCancel }: AlertFormProps) {
  const { t } = useLanguage();

  const form = useForm<AlertFormValues>({
    resolver: zodResolver(alertFormSchema),
    defaultValues: {
      cropType: "mustard",
      condition: "above",
      targetPrice: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cropType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-alert-crop">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mustard">{t("mustard")}</SelectItem>
                  <SelectItem value="groundnut">{t("groundnut")}</SelectItem>
                  <SelectItem value="soybean">{t("soybean")}</SelectItem>
                  <SelectItem value="sunflower">{t("sunflower")}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the crop you want to monitor
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-alert-condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="above">Price goes above</SelectItem>
                  <SelectItem value="below">Price goes below</SelectItem>
                  <SelectItem value="equals">Price equals</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                When to trigger the alert
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Price (₹/kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="6500"
                  {...field}
                  data-testid="input-alert-price"
                />
              </FormControl>
              <FormDescription>
                The price threshold for the alert
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-alert">
            {t("cancel")}
          </Button>
          <Button type="submit" data-testid="button-save-alert">
            {t("create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
