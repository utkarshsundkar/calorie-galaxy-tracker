
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodEntry, useCalories } from "@/context/CalorieContext";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FoodEntryList = () => {
  const { entries, removeEntry } = useCalories();

  // Group entries by date
  const entriesByDate = entries.reduce((acc, entry) => {
    const date = entry.timestamp.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, FoodEntry[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(entriesByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (entries.length === 0) {
    return (
      <Card className="glass-card mt-6 animate-fade-in">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No food entries yet. Start adding meals above!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 mt-6 animate-fade-in">
      {sortedDates.map((date) => (
        <Card key={date} className="glass-card overflow-hidden">
          <CardHeader className="bg-secondary/50 backdrop-blur-sm p-4">
            <CardTitle className="text-sm font-medium">
              {format(new Date(date), "EEEE, MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {entriesByDate[date].map((entry) => (
                <div 
                  key={entry.id} 
                  className="p-4 flex items-center justify-between group hover:bg-secondary/30 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{entry.foodName}</h3>
                    <div className="text-sm text-muted-foreground mt-1 flex gap-3">
                      <span>{entry.calories.toFixed(0)} kcal</span>
                      <span>•</span>
                      <span>P: {entry.protein.toFixed(1)}g</span>
                      <span>•</span>
                      <span>C: {entry.carbs.toFixed(1)}g</span>
                      <span>•</span>
                      <span>F: {entry.fat.toFixed(1)}g</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FoodEntryList;
