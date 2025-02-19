export function Card({ children }: { children: React.ReactNode }) {
    return <div className="bg-white p-4 rounded-lg shadow-md">{children}</div>;
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-2">{children}</div>;
  }
  