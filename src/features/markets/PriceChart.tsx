import ReactApexChart from "react-apexcharts";

interface PriceChartProps {
  title: string;
  data: { date: string; price: number }[];
  crop: string;
}

export function PriceChart({ title, data }: PriceChartProps) {
  const series = [
    {
      name: "Price",
      data: data.map((d) => d.price),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      categories: data.map((d) => d.date),
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: {
        formatter: (value) => `₹${value}`,
      },
    },
    tooltip: {
      theme: "light",
    },
    grid: {
      borderColor: "#eee",
    },
    fill: {
      opacity: 0.3,
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}
