export default function MobileFrame({ children }: { children: React.ReactNode }) {
    return (
      <div className="w-full flex justify-center bg-neutral-100 min-h-screen">
        <div className="w-[430px] bg-white min-h-screen shadow-lg border-x relative">
          
          <div className="pb-20"> 
            {children}
          </div>
          
        </div>
      </div>
    );
  }
  