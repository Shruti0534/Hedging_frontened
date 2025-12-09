import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
  instrumentType: z.enum(["futures", "options"]),
  positionType: z.enum(["long", "short"]), // Reused for options also
  quantity: z.string().min(1),
  entryPrice: z.string().optional(),   // Remove required
  strikePrice: z.string().optional(),  // Add
  premium: z.string().optional(),      // Add
  deliveryDate: z.string().min(1),
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
      deliveryDate: "", // default empty
      premium:"",
      strikePrice:""

    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* CROP */}
        <FormField
          control={form.control}
          name="cropType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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

        {/* POSITION TYPE */}
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
                    <RadioGroupItem value="long" id="long" className="peer sr-only" />
                    <Label
                      htmlFor="long"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover-elevate peer-data-[state=checked]:border-primary cursor-pointer"
                    >
                      <span className="text-sm font-medium">{form.watch("instrumentType") === "futures"?"Long (Buy)":"Call(Buy)"}</span>
                      <span className="text-xs text-muted-foreground mt-1">Profit when price rises</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="short" id="short" className="peer sr-only" />
                    <Label
                      htmlFor="short"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover-elevate peer-data-[state=checked]:border-primary cursor-pointer"
                    >
                      <span className="text-sm font-medium">{form.watch("instrumentType") === "futures"?"Sell(Buy)":"Put(Sell)"}</span>
                      <span className="text-xs text-muted-foreground mt-1">Profit when price falls</span>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* INSTRUMENT TYPE */}
        <FormField
          control={form.control}
          name="instrumentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrument</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select instrument" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="futures">Futures</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* QUANTITY & PRICE */}
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
                      onChange={(e) => {
                        field.onChange(e); 

                        const qty = Number(e.target.value);

                        // If empty or <= 0, reset premium
                        if (!qty || qty <= 0) {
                          form.setValue("premium", "");
                          return;
                        }

                        if (form.watch("instrumentType") === "options") {
                          const basePremium = 10;
                          const premiumPerKg = qty*basePremium;
                          form.setValue("premium", String(premiumPerKg));
                        }
                      }}

                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FUTURES: Entry Price */}
          {form.watch("instrumentType") === "futures" && (
            <FormField
              control={form.control}
              name="entryPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Price (₹/kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="6500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        
      {/* OPTIONS: Strike Price + Premium */}
      {form.watch("instrumentType") === "options" && (
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="strikePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strike Price (₹/kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
              control={form.control}
              name="premium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium (₹/kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      readOnly
                      disabled
                      placeholder="Auto calculated"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
      )}

        {/* DELIVERY DATE FIELD */}
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry / Closing Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]} // prevent selecting past days
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button type="submit">
            Execute Trade
          </Button>
        </div>
      </form>
    </Form>
  );
}
