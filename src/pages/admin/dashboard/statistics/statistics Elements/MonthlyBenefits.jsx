import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { format, parseISO } from "date-fns";

const chartConfig = {
  desktop: {
    label: "Total Amount",
    color: "#3641f5",
  },
};

export default function MonthlyBenefits() {
  const contracts = useSelector((state) => state.contracts);

  const chartData = useMemo(() => {
    const data = {};
    contracts.forEach((contract) => {
      const month = format(parseISO(contract.startDate), "MMMM");
      if (!data[month]) {
        data[month] = { month, desktop: 0 };
      }
      data[month].desktop += contract.price;
    });
    return Object.values(data);
  }, [contracts]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Amount</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#3641f5" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
