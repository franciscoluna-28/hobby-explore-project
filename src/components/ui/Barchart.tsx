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
import { Link } from "react-router-dom";
  

  interface BarChartSectionProps {
    data: FavoriteCategories;
  }

  
  export default function BarChartSection({ data }: BarChartSectionProps) {


    
  if(data.length === 0 || !data) {
    return(
      <div className="flex flex-col justify-center items-center">
    <div className="my-8 text-sm max-w-xl m-auto text-center leading-loose">You haven't saved activities yet! In order to see your stats, you need to save activities! <Link className="underline font-bold underline-offset-2" to="/home">Start here</Link></div>
   
    </div> 
    )}

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
  