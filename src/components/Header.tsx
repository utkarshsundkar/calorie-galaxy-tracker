
import React from "react";
import { useCalories } from "@/context/CalorieContext";

const Header = () => {
  const { dailyTotal } = useCalories();

  return (
    <header className="w-full mx-auto relative animate-fade-in">
      <div className="glass-card px-6 py-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 -z-10" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 dark:text-white">
                Calorie Tracker
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">
                Track your nutrition with precision
              </p>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <p className="text-sm font-medium text-muted-foreground mb-1">Today's Total</p>
              <p className="text-2xl font-semibold text-primary">
                {dailyTotal.calories.toFixed(0)} kcal
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Protein</p>
                  <p className="font-medium">{dailyTotal.protein.toFixed(1)}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Carbs</p>
                  <p className="font-medium">{dailyTotal.carbs.toFixed(1)}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fat</p>
                  <p className="font-medium">{dailyTotal.fat.toFixed(1)}g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
