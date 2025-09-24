"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import AdmissionLetter from "@/components/Enroll";
import styles from "./form.module.css";
import { EnrollmentAuthService, type EnrollmentData } from "../../auth/utils/enrollmentAuth";

export default function Letter() {
    const [formData, setFormData] = useState<EnrollmentData>({
        fullName: "",
        email: "",
        phone: "",
        regNum: "",
        bloodStatus: "",
    });
    const [isadmission, setIsAdmission] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Process enrollment with validation and auth creation
            const result = await EnrollmentAuthService.processEnrollment(formData);
            
            if (!result.success) {
                setError(result.error || "Enrollment failed");
                setLoading(false);
                return;
            }

            // Save to Firestore 'enrollments' collection
            await addDoc(collection(db, "enrollments"), {
                ...formData,
                createdAt: new Date(),
                status: "pending"
            });

            setName(formData.fullName);
            setIsAdmission(true);
        } catch (error: any) {
            setError(error.response?.data?.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (isadmission) {
        return <AdmissionLetter name={name}/>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center px-4 py-8 font-serif">
            <div className="relative max-w-2xl w-full">
                {/*  Wax Seal */}
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
                    <span className="text-3xl sm:text-4xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">H</span>
                </div>

                <div
                    className={`w-full rounded-2xl shadow-2xl border-4 border-yellow-700 p-6 sm:p-10 ${styles.formContainer}`}
                >
                    <h1 className="font-['Cinzel_Decorative'] text-3xl sm:text-4xl md:text-5xl text-yellow-200 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider mb-4">
                        Hogwarts Enrollment Form
                    </h1>

                    <p className="text-center text-yellow-300 mb-8 text-sm sm:text-base">
                        Please fill out the form below. Slots are extremely limited, so do not delay!
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-900/80 border-2 border-red-600 rounded-lg shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                            <p className="text-red-200 font-['Cinzel_Decorative'] flex items-center">
                                ⚡ {error}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="e.g., Albus Dumbledore"
                                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                                required
                            />
                        </div>

                        {/* Magical Email ID Input */}
                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
                                Magical Email ID
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="firstname.25BCE1234@vitapstudent.ac.in"
                                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                                pattern="^[a-zA-Z]+\.[a-zA-Z0-9]+@vitapstudent\.ac\.in$"
                                title="Format: <firstname>.<registration_number>@vitapstudent.ac.in"
                                required
                            />
                            <p className="mt-1 text-xs text-yellow-300/70">
                                Format: <span className="font-mono">firstname.regnumber@vitapstudent.ac.in</span>
                            </p>
                        </div>

                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                                pattern="[0-9]{10}"
                                title="Please enter a valid 10-digit phone number."
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
                                Registration Number
                            </label>
                            <input
                                type="text"
                                name="regNum"
                                value={formData.regNum}
                                onChange={handleChange}
                                placeholder="e.g., 25BCE1234"
                                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
                                Magical Blood Status
                            </label>
                            <select 
                                name="bloodStatus" 
                                value={formData.bloodStatus}
                                onChange={handleChange}
                                title="Select your magical blood status"
                                className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100"
                            >
                                <option value="">Select your magical heritage</option>
                                <option value="pure-blood">Pure-blood</option>
                                <option value="half-blood">Half-blood</option>
                                <option value="muggle-born">Muggle-born</option>
                                <option value="squib">Squib</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-['Cinzel_Decorative'] text-black rounded-full border-2 border-yellow-600/50 transition-all duration-300 ${
                                    loading 
                                        ? "bg-gray-600 cursor-not-allowed" 
                                        : "bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)]"
                                }`}
                            >
                                {loading ? "Creating Your Magical Account..." : "Enter Hogwarts & Create Account"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

