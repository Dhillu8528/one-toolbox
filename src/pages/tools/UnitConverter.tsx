import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UnitConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [category, setCategory] = useState("length");

  const conversions: Record<string, Record<string, number>> = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      kilometers: 0.001,
      miles: 0.000621371,
    },
    weight: {
      kilograms: 1,
      pounds: 2.20462,
      ounces: 35.274,
      grams: 1000,
    },
    temperature: {
      celsius: 1,
      fahrenheit: 33.8,
      kelvin: 274.15,
    },
  };

  const convert = () => {
    if (!value) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    if (category === "temperature") {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        return ((num * 9/5) + 32).toFixed(2);
      }
      if (fromUnit === "celsius" && toUnit === "kelvin") {
        return (num + 273.15).toFixed(2);
      }
      if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        return ((num - 32) * 5/9).toFixed(2);
      }
      if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
        return (((num - 32) * 5/9) + 273.15).toFixed(2);
      }
      if (fromUnit === "kelvin" && toUnit === "celsius") {
        return (num - 273.15).toFixed(2);
      }
      if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
        return (((num - 273.15) * 9/5) + 32).toFixed(2);
      }
      return num.toFixed(2);
    }

    const baseValue = num / conversions[category][fromUnit];
    return (baseValue * conversions[category][toUnit]).toFixed(4);
  };

  const result = convert();

  return (
    <ToolPage
      title="Unit Converter"
      description="Convert between different units of measurement"
    >
      <div className="space-y-6">
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={(val) => {
            setCategory(val);
            setFromUnit(Object.keys(conversions[val])[0]);
            setToUnit(Object.keys(conversions[val])[1]);
          }}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="length">Length</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>From</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Input
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(conversions[category]).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>To</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Input value={result} readOnly className="bg-muted" />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(conversions[category]).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </ToolPage>
  );
}
