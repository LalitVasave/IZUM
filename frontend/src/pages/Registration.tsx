import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import TopAppBar from '../components/TopAppBar';
import { ArrowRight } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const RegisterSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Requires an uppercase letter").regex(/[0-9]/, "Requires a number"),
  role: z.enum(["student", "driver", "admin"]),
  college_id: z.string().optional(),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "driver" | "admin">("student");
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { role: "student" }
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await api.post('/auth/register', data); // will map /api to backend via Vite proxy
      toast.success("Registration successful");
      useAuthStore.getState().setAuth(response.data.access_token, response.data.user);
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <TopAppBar title="Registration Portal" />
      <main className="relative min-h-screen pt-24 pb-12 flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 obsidian-grid pointer-events-none"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative w-full max-w-md px-6 z-10">
          {/* Welcome Hero */}
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">System Status: Ready</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tighter mb-2 text-on-surface">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Observatory</span>
            </h2>
            <p className="text-on-surface-variant font-light max-w-sm">Secure your access to the next generation of campus mobility analytics.</p>
          </div>

          {/* Registration Form Glass Panel */}
          <div className="glass-panel p-8 rounded-3xl shadow-2xl">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Role Selection (Added to support the schema) */}
              <div className="flex gap-4 mb-4">
                {(['student', 'driver'] as const).map(r => (
                  <button 
                    key={r}
                    type="button" 
                    onClick={() => { setRole(r); register('role').onChange({ target: { value: r, name: 'role' }}) }}
                    className={`flex-1 py-2 rounded-xl text-xs font-label uppercase tracking-wider transition-colors ${role === r ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-surface-container-low text-on-surface-variant border border-transparent'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Field: Full Name */}
              <div className="space-y-1.5 group">
                <label className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant ml-1">Full Name</label>
                <div className="relative">
                  <input {...register('name')} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary transition-all font-body focus:outline-none" placeholder="ALEX RIVERA" type="text" />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-300 shadow-[0_2px_8px_rgba(142,255,113,0.4)]"></div>
                </div>
                {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Field: University ID */}
              {role === 'student' && (
                <div className="space-y-1.5 group">
                  <label className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant ml-1">University ID</label>
                  <div className="relative">
                    <input {...register('college_id')} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary transition-all font-label focus:outline-none" placeholder="U-882941-X" type="text" />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-300 shadow-[0_2px_8px_rgba(142,255,113,0.4)]"></div>
                  </div>
                </div>
              )}

              {/* Field: Campus Email */}
              <div className="space-y-1.5 group">
                <label className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant ml-1">Campus Email</label>
                <div className="relative">
                  <input {...register('email')} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary transition-all font-body focus:outline-none" placeholder="A.RIVERA@CAMPUS.EDU" type="email" />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-300 shadow-[0_2px_8px_rgba(142,255,113,0.4)]"></div>
                </div>
                {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Field: Password */}
              <div className="space-y-1.5 group">
                <label className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant ml-1">Password</label>
                <div className="relative">
                  <input {...register('password')} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary transition-all font-body focus:outline-none" placeholder="••••••••••••" type="password" />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-300 shadow-[0_2px_8px_rgba(142,255,113,0.4)]"></div>
                </div>
                {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Register Button */}
              <button disabled={isSubmitting} className="w-full mt-6 py-4 rounded-full bg-gradient-to-tr from-primary to-primary-container text-black font-extrabold font-headline uppercase tracking-widest text-sm transition-all glow-button active:scale-[0.98] disabled:opacity-50" type="submit">
                {isSubmitting ? 'Registering...' : 'Register Account'}
              </button>
            </form>

            {/* Redirect */}
            <div className="mt-8 text-center">
              <Link to="/login" className="font-label text-[11px] uppercase tracking-tighter text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
                Already have an identity? <span className="text-primary font-bold">Sign in instead</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Editorial Accents */}
          <div className="mt-12 flex justify-between items-end opacity-40">
            <div className="flex flex-col">
              <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Encryption Level</span>
              <span className="font-label text-sm text-secondary uppercase font-bold">AES-256-GCM</span>
            </div>
            <div className="text-right">
              <span className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Location Node</span>
              <span className="font-label text-sm text-primary uppercase font-bold">IZUM-GLOBAL-01</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Registration;
