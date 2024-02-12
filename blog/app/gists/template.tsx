'use client'

import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(()=>{
        console.log('useEffect test')
    }, []);
    return (
        <>{children}</>
    );
}