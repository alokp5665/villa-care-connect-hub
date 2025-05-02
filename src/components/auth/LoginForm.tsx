
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  className?: string;
  onLogin?: (email: string, password: string, role: UserRole) => void;
}

const LoginForm = ({ className, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate login - in a real app this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onLogin) {
        onLogin(email, password, role);
      }
      
      // Show success message
      toast({
        title: "Login successful",
        description: `Logged in as ${role}`,
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">Villa Care Connect</CardTitle>
        <CardDescription>Enter your credentials to access the platform</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Login As</Label>
            <RadioGroup 
              defaultValue={role} 
              onValueChange={(value) => setRole(value as UserRole)}
              className="flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={UserRole.ADMIN} id="admin" />
                <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={UserRole.MANAGER} id="manager" />
                <Label htmlFor="manager" className="cursor-pointer">Manager</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={UserRole.TECHNICIAN} id="technician" />
                <Label htmlFor="technician" className="cursor-pointer">Technician</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={UserRole.CUSTOMER} id="customer" />
                <Label htmlFor="customer" className="cursor-pointer">Customer</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
