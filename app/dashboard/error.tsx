"use client";

import { useEffect } from "react";

export default function Error({error, reset}: { error: Error & {digest?: string}; reset: ()=> void}) {
    useEffect(()=> {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong!</h2>
                <p className="text-slate-600 mb-6">An unexpected error occurred. Please try again.</p>
                <button onClick={()=>reset()} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Try Again
                </button>
            </div>
        </main>
    )
}