
import React from "react";
import Header from "@/components/Header";
import FoodEntryForm from "@/components/FoodEntryForm";
import FoodEntryList from "@/components/FoodEntryList";
import NutritionChart from "@/components/NutritionChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Header />
        
        <div className="space-y-6">
          <FoodEntryForm />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <NutritionChart />
            </div>
            <div>
              <FoodEntryList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
