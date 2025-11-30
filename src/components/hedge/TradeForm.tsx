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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

const tradeFormSchema = z.object({
  cropType: z.enum(["mustard", "groundnut", "soybean", "sunflower"]),
  positionType: z.enum(["long", "short"]),
  instrumentType: z.enum(["futures", "options"]),
  quantity: z.string().min(1, "Quantity is required"),
  entryPrice: z.string().min(1, "Entry price is required"),
});

type TradeFormValues = z.infer<typeof tradeFormSchema>;

interface TradeFormProps {
  onSubmit: (values: TradeFormValues) => void;
  onCancel: () => void;
}

export function TradeForm({ onSubmit, onCancel }: TradeFormProps) {
  const { t } = useLanguage();

  const form = useForm<TradeFormValues>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      cropType: "mustard",
      positionType: "long",
      instrumentType: "futures",
      quantity: "",
      entryPrice: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cropType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-trade-crop">
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="positionType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Position Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="long"
                      id="long"
                      className="peer sr-only"
                      data-testid="radio-position-long"
                    />
                    <Label
                      htmlFor="long"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover-elevate peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="text-sm font-medium">Long (Buy)</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Profit when price rises
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="short"
                      id="short"
                      className="peer sr-only"
                      data-testid="radio-position-short"
                    />
                    <Label
                      htmlFor="short"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover-elevate peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="text-sm font-medium">Short (Sell)</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Profit when price falls
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instrumentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrument</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-trade-instrument">
                    <SelectValue placeholder="Select instrument" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="futures">Futures</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Futures: obligation to buy/sell at fixed price. Options: right but not obligation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1000"
                    {...field}
                    data-testid="input-trade-quantity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entryPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entry Price (₹/kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="6500"
                    {...field}
                    data-testid="input-trade-price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-trade">
            {t("cancel")}
          </Button>
          <Button type="submit" data-testid="button-execute-trade">
            Execute Trade
          </Button>
        </div>
      </form>
    </Form>
  );
}
