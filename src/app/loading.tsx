export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-magic-border rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl animate-pulse">✧</div>
        </div>
      </div>
      
      <p className="font-pirata text-xl mt-6 animate-pulse">
        Summoning arcane energies...
      </p>
    </div>
  );
}
