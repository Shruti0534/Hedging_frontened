import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CropBadge } from "@/components/common/CropBadge";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface PriceData {
  crop: string;
  currentPrice: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: number;
}

interface PriceTableProps {
  data: PriceData[];
}

export function PriceTable({ data }: PriceTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crop</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-right">24h High</TableHead>
            <TableHead className="text-right">24h Low</TableHead>
            <TableHead className="text-right">Volume (kg)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            const isPositive = row.change24h >= 0;
            return (
              <TableRow key={row.crop} className="hover-elevate" data-testid={`row-market-${row.crop}`}>
                <TableCell>
                  <CropBadge crop={row.crop} />
                </TableCell>
                <TableCell className="text-right font-semibold" data-testid={`text-price-${row.crop}`}>
                  ₹{row.currentPrice.toLocaleString('en-IN')}
                </TableCell>
                <TableCell className={`text-right font-medium ${isPositive ? 'text-chart-1' : 'text-destructive'}`}>
                  <div className="flex items-center justify-end gap-1">
                    {isPositive ? (
                      <ArrowUpIcon className="h-3 w-3" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3" />
                    )}
                    ₹{Math.abs(row.change24h)}
                    <span className="text-xs">
                      ({((Math.abs(row.change24h) / row.currentPrice) * 100).toFixed(2)}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-chart-1">
                  ₹{row.high24h.toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-right text-destructive">
                  ₹{row.low24h.toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {row.volume.toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
