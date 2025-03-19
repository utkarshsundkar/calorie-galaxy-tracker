
import React, { createContext, useContext, useState, useEffect } from "react";

export interface FoodEntry {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
}

interface CalorieContextType {
  entries: FoodEntry[];
  addEntry: (entry: Omit<FoodEntry, "id" | "timestamp">) => void;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
  dailyTotal: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const CalorieContext = createContext<CalorieContextType | undefined>(undefined);

export const CalorieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<FoodEntry[]>(() => {
    const savedEntries = localStorage.getItem("calorieEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  const [dailyTotal, setDailyTotal] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  useEffect(() => {
    localStorage.setItem("calorieEntries", JSON.stringify(entries));
    
    // Calculate totals
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = entries.filter(entry => entry.timestamp.includes(today));
    
    const totals = todayEntries.reduce(
      (acc, entry) => {
        return {
          calories: acc.calories + entry.calories,
          protein: acc.protein + entry.protein,
          carbs: acc.carbs + entry.carbs,
          fat: acc.fat + entry.fat,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    
    setDailyTotal(totals);
  }, [entries]);

  const addEntry = (entry: Omit<FoodEntry, "id" | "timestamp">) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearEntries = () => {
    setEntries([]);
  };

  return (
    <CalorieContext.Provider
      value={{
        entries,
        addEntry,
        removeEntry,
        clearEntries,
        dailyTotal,
      }}
    >
      {children}
    </CalorieContext.Provider>
  );
};

export const useCalories = () => {
  const context = useContext(CalorieContext);
  if (context === undefined) {
    throw new Error("useCalories must be used within a CalorieProvider");
  }
  return context;
};
