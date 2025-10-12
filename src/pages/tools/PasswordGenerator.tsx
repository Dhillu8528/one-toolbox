import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast.error("Please select at least one character type");
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
    toast.success("Password generated!");
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied!");
  };

  return (
    <ToolPage
      title="Password Generator"
      description="Generate strong, random passwords"
    >
      <div className="space-y-6">
        <div>
          <Label>Password Length: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="mt-2"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
            />
            <Label htmlFor="uppercase" className="cursor-pointer">Include Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
            />
            <Label htmlFor="lowercase" className="cursor-pointer">Include Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
            />
            <Label htmlFor="numbers" className="cursor-pointer">Include Numbers (0-9)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
            />
            <Label htmlFor="symbols" className="cursor-pointer">Include Symbols (!@#$...)</Label>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full gap-2">
          <RefreshCw className="w-4 h-4" />
          Generate Password
        </Button>

        {password && (
          <div>
            <Label>Generated Password</Label>
            <div className="flex gap-2 mt-2">
              <Input value={password} readOnly className="font-mono" />
              <Button variant="outline" size="icon" onClick={copyPassword}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
