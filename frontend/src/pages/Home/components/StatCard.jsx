/* eslint-disable react/prop-types */

  
  export function StatCard({ number, label }) {
    return (
      <div className="space-y-2">
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
          {number}
        </div>
        <div className="text-gray-400">{label}</div>
      </div>
    );
  }