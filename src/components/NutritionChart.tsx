
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useCalories } from "@/context/CalorieContext";

const NutritionChart = () => {
  const { dailyTotal } = useCalories();
  
  const data = [
    { name: "Protein", value: dailyTotal.protein * 4, color: "#3B82F6" }, // 4 calories per gram
    { name: "Carbs", value: dailyTotal.carbs * 4, color: "#10B981" }, // 4 calories per gram
    { name: "Fat", value: dailyTotal.fat * 9, color: "#F59E0B" }, // 9 calories per gram
  ];

  const totalCalories = dailyTotal.calories;
  
  // Don't show chart if there's no data
  if (totalCalories === 0) {
    return null;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalCalories) * 100).toFixed(1);
      
      return (
        <div className="glass-effect p-2 text-xs rounded-md shadow-md">
          <p className="font-medium">{`${data.name}: ${percentage}%`}</p>
          <p>{`${Math.round(data.value)} calories`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Macronutrient Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                animationDuration={800}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="transition-all duration-300"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-4 mt-2 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionChart;
