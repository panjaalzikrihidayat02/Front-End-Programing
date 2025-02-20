import { useEffect, useState } from "react";

export default function Counter() {
  const [total, setTotal] = useState(0);

  const count = () => {
    setTotal(total+1)
  };

  useEffect(() => {
    count()
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
        <br />
        <br />
        <br />
      <p className="text-xl font-bold">Total: {total}</p>
      <button 
        onClick={count} 
        className="bg-teal-500 text-white px-4 py-2 p-30 rounded-lg hover:bg-teal-600 transition-all"
      >
        Tambah
      </button>
    </div>
  );
}
