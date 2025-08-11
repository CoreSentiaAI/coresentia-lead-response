// components/RealityCheckCard.tsx
const RealityCheckCard = () => {
  return (
    <div className="bg-gradient-to-r from-[#2A50DF]/20 to-[#62D4F9]/20 backdrop-blur-xl border border-[#62D4F9] rounded-xl p-6 my-4">
      <h3 className="text-xl font-bold text-[#62D4F9] mb-3">
        AI Reality Check™
      </h3>
      <p className="text-white/90 mb-4">
        40-minute strategy session to analyze your current AI spend and show you exactly how we'd replace it.
      </p>
      <button 
        onClick={() => window.open('https://calendar.app.google/X6T7MdmZCxF3mGBe7', '_blank')}
        className="w-full bg-[#62D4F9] text-black font-bold py-3 rounded-lg hover:bg-[#40FFD9] transition-all"
      >
        Book Your Free Session →
      </button>
    </div>
  )
}
