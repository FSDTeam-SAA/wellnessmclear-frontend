"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';


export default function OtpFrom() {
  const [currentView, setCurrentView] = useState('otp'); // 'otp' or 'password'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleVerify = () => {
    console.log('OTP:', otp.join(''));
    // Add verification logic here
  };

  const handleContinue = () => {
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Add password creation logic here
  };

  const resendOtp = () => {
    console.log('Resending OTP...');
    // Add resend logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex">
      {/* Left side - Image */}
      <div className="hidden lg:w-3/5 md:w-1/2 bg-gray-900 lg:block relative">
              <Image
                src="https://files.edgestore.dev/t7diwg54d3s82m9n/wellnessmclear/_public/login.jpg"
                alt="Team meeting"
                fill
                className="object-cover"
              />
            </div>
      

      {/* Right side - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {currentView === 'otp' ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Enter OTP</h2>
                <p className="text-gray-600 text-sm">
                  An OTP has been sent to your email address.
                  <br />
                  Please verify it below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-green-400 focus:outline-none text-lg font-semibold"
                      maxLength={1}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Didnt receive OTP?{' '}
                    <button
                      onClick={resendOtp}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>

                <button
                  onClick={handleVerify}
                  className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Verify
                </button>

                <div className="text-center">
                  <button
                    onClick={() => setCurrentView('password')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Switch to Password Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">New Password</h2>
                <p className="text-gray-600 text-sm">
                  Please create your new password.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Re-enter Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter Password..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Continue
                </button>

                <div className="text-center">
                  <button
                    onClick={() => setCurrentView('otp')}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Back to OTP Verification
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}