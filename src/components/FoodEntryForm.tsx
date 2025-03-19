
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCalories } from "@/context/CalorieContext";
import { analyzeFoodWithGemini } from "@/services/geminiApi";

const FoodEntryForm = () => {
  const { addEntry } = useCalories();
  const [foodDescription, setFoodDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodDescription.trim()) {
      toast.error("Please enter a food description");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeFoodWithGemini(foodDescription);
      let parsedResult;
      
      try {
        // Find the JSON part in the response (in case there's additional text)
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResult = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No valid JSON found in response");
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", result);
        toast.error("Failed to parse food information");
        setIsAnalyzing(false);
        return;
      }
      
      addEntry({
        foodName: parsedResult.foodName || foodDescription,
        calories: Number(parsedResult.calories) || 0,
        protein: Number(parsedResult.protein) || 0,
        carbs: Number(parsedResult.carbs) || 0,
        fat: Number(parsedResult.fat) || 0,
      });
      
      toast.success("Food added successfully");
      setFoodDescription("");
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Failed to analyze food. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="glass-card animate-slide-up">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="foodDescription">What did you eat?</Label>
            <div className="flex gap-2">
              <Input
                id="foodDescription"
                placeholder="e.g., 1 large apple, 100g chicken breast, 1 cup rice"
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
                className="flex-1"
                disabled={isAnalyzing}
              />
              <Button type="submit" disabled={isAnalyzing || !foodDescription.trim()}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </>
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered by Gemini AI for accurate nutritional analysis
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default FoodEntryForm;
