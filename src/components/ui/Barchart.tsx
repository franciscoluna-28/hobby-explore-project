import {
    BarChart,
    CartesianGrid,
    YAxis,
    XAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer,
  } from "recharts";
import { FavoriteCategories } from "../../pages/Profile";
  

  interface BarChartSectionProps {
    data: FavoriteCategories;
  }
  
  export default function BarChartSection({ data }: BarChartSectionProps) {
    return (
      <ResponsiveContainer width="100%" height={300} className="mt-4">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#00C9A7" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  