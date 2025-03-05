"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminDebug() {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
      >
        Debug
      </button>
      
      {isVisible && (
        <div className="mt-2 p-4 bg-white border border-gray-300 rounded-md shadow-lg max-w-lg overflow-auto max-h-96">
          <h3 className="font-bold mb-2">Session Debug Info:</h3>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>User:</strong> {session?.user?.email || 'Not logged in'}</p>
          <p><strong>Role:</strong> {(session?.user as any)?.role || 'No role'}</p>
          <pre className="mt-4 p-2 bg-gray-100 rounded overflow-auto text-xs">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}