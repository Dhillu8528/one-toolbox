import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <ToolPage
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days"
    >
      <div className="space-y-6">
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-2"
          />
        </div>

        <Button onClick={calculateAge} className="w-full">Calculate Age</Button>

        {age && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Years", value: age.years },
              { label: "Months", value: age.months },
              { label: "Days", value: age.days },
            ].map((stat) => (
              <Card key={stat.label} className="p-4 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  );
}
