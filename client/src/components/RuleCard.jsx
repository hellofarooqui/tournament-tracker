const RuleCard = ({ rule }) => {
  return (
    <div className="overflow-clip rounded-[15px]">
    <div className="w-full h-full  shadow-md bg-slate-200/20 backdrop-blur-2xl border-slate-200/30 ">
      <h2 className="text-lg font-semibold p-2  text-center text-slate-600 bg-gradient-to-r from-[#FFA9CC] via-[#FEB2A4] to-[#FFC36B]">{rule.category}</h2>
      <ul className="flex flex-col gap-y-2 p-4 pl-8 text-[16px] font-thin list-disc">
        {rule.rules.map((r, index) => (
            <li key={index}><p className="leading-6">{r}</p></li>
        ))}
      </ul>
    
    </div>
    </div>
  )
}
export default RuleCard