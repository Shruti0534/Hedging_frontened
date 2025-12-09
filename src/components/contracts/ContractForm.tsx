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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const contractFormSchema = z.object({
  cropType: z.enum(["mustard", "groundnut", "soybean", "sunflower"]),
  quantity: z.string().min(1),
  agreedPrice: z.string().min(1),
  buyerName: z.string().min(1),
  marginAmount: z.string().min(1, "Margin is required"),
  deliveryDate: z.date(),
});


type ContractFormValues = z.infer<typeof contractFormSchema>;

interface ContractFormProps {
  onSubmit: (values: ContractFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ContractForm({ onSubmit, onCancel, isLoading }: ContractFormProps) {
  const { t } = useLanguage();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      cropType: "mustard",
      quantity: "",
      agreedPrice: "",
      buyerName: "",
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
                  <SelectTrigger data-testid="select-contract-crop">
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
                    data-testid="input-contract-quantity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agreed Price (₹/kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="6500"
                    {...field}
                    data-testid="input-contract-price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="buyerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter buyer or organization name"
                  {...field}
                  data-testid="input-contract-buyer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Delivery Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      data-testid="button-contract-date"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The date when the crop will be delivered
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marginAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Margin Amount (ETH in wei)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10000000000000000"
                  {...field}
                  data-testid="input-contract-margin"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-contract">
            {t("cancel")}
          </Button>
          <Button type="submit" data-testid="button-save-contract">
            {isLoading ? "Loading...":"Create Contract"} 
          </Button>
        </div>
      </form>
    </Form>
  );
}
