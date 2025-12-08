import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, Mail, Lock, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';
import { GoogleLogin } from '@react-oauth/google';

interface PatientLoginProps {
  onLogin: (patient: any) => void;
  onRegister: () => void;
}

export function PatientLogin({ onLogin, onRegister }: PatientLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }
    setIsLoading(true);
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const API_BASE = import.meta.env.VITE_API_BASE_URL || `http://${host}:8080`;
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error((payload && (payload.message || payload.error)) || 'Login failed');
        setIsLoading(false);
        return;
      }
      // Role-based boundary: only allow PATIENT to access Patient PWA
      const role = payload?.user?.role;
      if (role !== 'PATIENT') {
        toast.error('Access denied: This app is for patients. Please use the correct portal.');
        try { localStorage.removeItem('accessToken'); } catch {}
        setIsLoading(false);
        return;
      }
      localStorage.setItem('accessToken', payload.accessToken);
      const name = payload?.user?.fullName || payload?.user?.name || 'Patient';
      const patient = {
        id: String(payload?.user?.id || ''),
        name,
        email: payload?.user?.email || '',
        phone: payload?.user?.phoneNumber || '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        medicalHistory: '',
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      };
      localStorage.setItem('currentUser', JSON.stringify(patient));
      // Existing users logging in are not new
      localStorage.setItem('isNewUser', 'false');
      onLogin(patient);
      toast.success('Welcome back!');
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
      const API_BASE = import.meta.env.VITE_API_BASE_URL || `http://${host}:8080`;
      const res = await fetch(`${API_BASE}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credentialResponse?.credential, intendedRole: 'PATIENT' })
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = (payload && (payload.message || payload.error)) || 'Google login failed';
        if (msg === 'Bad Request') {
          toast.error('No patient account found for this Google account. Please sign up.');
          onRegister();
          setIsLoading(false);
          return;
        }
        if (typeof msg === 'string' && msg.toLowerCase().includes('no account found')) {
          toast.error('No patient account found for this Google account. Please sign up.');
          onRegister();
        } else if (res.status === 403 && typeof msg === 'string') {
          toast.error(msg);
        } else {
          toast.error(msg);
        }
        setIsLoading(false);
        return;
      }
      const role = payload?.user?.role;
      if (role !== 'PATIENT') {
        toast.error('Access denied: This app is for patients. Please use the correct portal.');
        try { localStorage.removeItem('accessToken'); } catch {}
        setIsLoading(false);
        return;
      }
      localStorage.setItem('accessToken', payload.accessToken);
      const name = payload?.user?.fullName || payload?.user?.name || 'Patient';
      const patient = {
        id: String(payload?.user?.id || ''),
        name,
        email: payload?.user?.email || '',
        phone: payload?.user?.phoneNumber || '',
        dateOfBirth: '',
        address: '',
        emergencyContact: '',
        medicalHistory: '',
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      };
      localStorage.setItem('currentUser', JSON.stringify(patient));
      localStorage.setItem('isNewUser', 'false');
      onLogin(patient);
      toast.success('Welcome back!');
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)'
    }}>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{
            background: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)'
          }}>
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to DigiHealth</CardTitle>
          <CardDescription>Sign in to your DigiHealth account</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error('Google login failed. Please try again.');
            }}
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="100%"
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="juan.delacruz@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Button variant="link" className="px-0 text-sm" type="button">
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-12"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <Button
              variant="link"
              className="px-1"
              onClick={onRegister}
            >
              Create account
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
