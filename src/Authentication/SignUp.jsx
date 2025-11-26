import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { Eye, EyeOff, Lock, Mail, User, Image, Sparkles, CheckCircle, XCircle } from 'lucide-react';

const SignUp = () => {
  const { creatNewUser, setUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photourl: '',
    password: ''
  });
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@!#$^&*(~)]/.test(password)
    });
  };

  const handleregister = () => {
    setIsLoading(true);
    setError("");

    const { name, email, password, photourl } = formData;

    if (name.length < 5) {
      setError("Name must be more than 5 characters");
      setIsLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("At least one lowercase letter required");
      setIsLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("At least one uppercase letter required");
      setIsLoading(false);
      return;
    }
    if (!/\d/.test(password)) {
      setError("At least one number required");
      setIsLoading(false);
      return;
    }
    if (!/[@!#$^&*(~)]/.test(password)) {
      setError("At least one special character required");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    creatNewUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: photourl })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photourl });
            navigate("/");
          })
          .catch((error) => {
            setError(error.message);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleregister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .input-glow:focus {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }
      `}</style>

      <div className="relative z-10 w-full max-w-md">
        
        <div className="glass-effect rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.02]"
             style={{
               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
               transform: 'perspective(1000px) rotateX(2deg)'
             }}>
          
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg transform -rotate-6 hover:-rotate-12 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-purple-200">Join us and start your journey</p>
          </div>

          <div>
           
            <div className="relative mb-5">
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  className="input-glow w-full pl-10 pr-4 py-3 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  placeholder="Ashadul islam"
                />
              </div>
            </div>

           
            <div className="relative mb-5">
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  className="input-glow w-full pl-10 pr-4 py-3 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  placeholder="ashadulislam691@gmail.com"
                />
              </div>
            </div>

            
            <div className="relative mb-5">
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Photo URL <span className="text-purple-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type="text"
                  name="photourl"
                  value={formData.photourl}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="input-glow w-full pl-10 pr-4 py-3 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

           
            <div className="relative mb-4">
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  required
                  className="input-glow w-full pl-10 pr-12 py-3 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            
            <div className="mb-6 p-3 bg-white/5 rounded-xl border border-purple-300/20">
              <p className="text-xs text-purple-200 mb-2 font-medium">Password must contain:</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  {passwordValidation.length ? 
                    <CheckCircle className="h-4 w-4 text-green-400" /> : 
                    <XCircle className="h-4 w-4 text-gray-400" />
                  }
                  <span className={passwordValidation.length ? "text-green-300" : "text-purple-300"}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {passwordValidation.lowercase ? 
                    <CheckCircle className="h-4 w-4 text-green-400" /> : 
                    <XCircle className="h-4 w-4 text-gray-400" />
                  }
                  <span className={passwordValidation.lowercase ? "text-green-300" : "text-purple-300"}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {passwordValidation.uppercase ? 
                    <CheckCircle className="h-4 w-4 text-green-400" /> : 
                    <XCircle className="h-4 w-4 text-gray-400" />
                  }
                  <span className={passwordValidation.uppercase ? "text-green-300" : "text-purple-300"}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {passwordValidation.number ? 
                    <CheckCircle className="h-4 w-4 text-green-400" /> : 
                    <XCircle className="h-4 w-4 text-gray-400" />
                  }
                  <span className={passwordValidation.number ? "text-green-300" : "text-purple-300"}>
                    One number
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {passwordValidation.special ? 
                    <CheckCircle className="h-4 w-4 text-green-400" /> : 
                    <XCircle className="h-4 w-4 text-gray-400" />
                  }
                  <span className={passwordValidation.special ? "text-green-300" : "text-purple-300"}>
                    One special character (@!#$^&*(~))
                  </span>
                </div>
              </div>
            </div>

            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 backdrop-blur-sm mb-6">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

           
            <button
              type="button"
              disabled={isLoading}
              onClick={handleregister}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden mb-6"
            >
              <span className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                Create Account
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>

           
            <div className="text-center pt-4">
              <p className="text-purple-200">
                Already have an account?{' '}
                <Link 
                  to="/auth/signin" 
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-purple-500/30 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
};

export default SignUp;