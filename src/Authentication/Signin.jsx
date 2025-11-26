import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; 
import { AuthContext } from '../Provider/AuthProvider';
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';

const Signin = () => {
    const {signInUser, setUser} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlelogin = () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');
        
        signInUser(formData.email, formData.password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                const errormessage = error.message;
                setError(errormessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlelogin();
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
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg transform rotate-6 hover:rotate-12 transition-transform duration-300">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-purple-200">Sign in to continue your journey</p>
                    </div>

                    <div>
                       
                        <div className="relative mb-6">
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

                        
                        <div className="relative mb-6">
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

                        
                        <div className="flex items-center justify-end mb-6">
                            <a href="#" className="text-sm text-purple-300 hover:text-white transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 backdrop-blur-sm mb-6">
                                <p className="text-red-200 text-sm">{error}</p>
                            </div>
                        )}

                       
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={handlelogin}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden mb-6"
                        >
                            <span className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                                Sign In
                            </span>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>

                        
                        <div className="text-center pt-4">
                            <p className="text-purple-200">
                                New to this site?{' '}
                                <Link 
                                    to="/auth/signup" 
                                    className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                                >
                                    Sign Up
                                </Link>
                                {' '}now!
                            </p>
                        </div>
                    </div>
                </div>

               
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-purple-500/30 rounded-full filter blur-3xl"></div>
            </div>
        </div>
    );
};

export default Signin;