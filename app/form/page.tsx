"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios"
import AdmissionLetter from "@/components/Enroll";

const Form = ({ formData, handleChange, handleSubmit }: {
    formData: {
        fullName: string;
        email: string;
        phone: string;
        regNum: string;
        bloodStatus: string;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
    return(
        <div className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center px-4 py-8 font-serif">
        <div className="relative max-w-2xl w-full">
            {/*  Wax Seal */}
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-red-700 flex items-center justify-center shadow-[0_0_25px_5px_rgba(255,215,0,0.9)] animate-pulse z-20">
                <span className="text-3xl sm:text-4xl drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">H</span>
            </div>

            <div
                className="w-full rounded-2xl shadow-2xl border-4 border-yellow-700 p-6 sm:p-10"
                style={{
                    backgroundColor: "#4f2800",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.5)",
                }}
            >
                <h1 className="font-['Cinzel_Decorative'] text-3xl sm:text-4xl md:text-5xl text-yellow-200 text-center drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] tracking-wider mb-4">
                    Hogwarts Enrollment Form
                </h1>

                <p className="text-center text-yellow-300 mb-8 text-sm sm:text-base">
                    Please fill out the form below. Slots are extremely limited, so do not delay!
                </p>

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

                    {/* College Email ID Input */}
                    <div>
                        <label className="block text-yellow-200 font-['Cinzel_Decorative'] mb-2 text-base sm:text-lg pl-3 border-l-4 border-yellow-600">
                            College Email ID
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@vitapstudent.ac.in"
                            className="w-full px-4 py-3 rounded-lg border-2 border-yellow-800 bg-[#3a1d00]/80 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner text-yellow-100 placeholder-yellow-300/50"
                            pattern=".+@vitapstudent\.ac\.in"
                            title="Must be a valid @vitapstudent.ac.in email address."
                            required
                        />
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
                            className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-['Cinzel_Decorative'] text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,1)] transition-all duration-300 border-2 border-yellow-600/50"
                        >
                            Send My Acceptance Letter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
};

export default function Letter() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        regNum: "",
        bloodStatus: "",
    });
    const [isadmission, setIsAdmission] = useState(false)
    const [name, setName] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // window.location.href = "/enroll";

        await axios.post('/api/add', 
            formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            
          )
          .then(function (response) {
            setName(formData.fullName)
            setIsAdmission(true)
            console.log("Name", formData.fullName);
          })
          .catch(function (error) {
            console.log(error);
          });        
    };

    return (
        <div>
             {isadmission? <AdmissionLetter name={name}/>: <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>}
        </div>
       
    );
}

