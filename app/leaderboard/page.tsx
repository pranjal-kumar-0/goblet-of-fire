"use client"
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
        const fetchLeaderboard = async () => {
            const res = await fetch("/api/leaderboard");
            if (!res.ok) { throw new Error("Deez nuts") }
            const data = await res.json();
            console.log(data) 

        }
        fetchLeaderboard()
    }
        , [])
    return (
        <div>

        </div>
    )
}

export default page
