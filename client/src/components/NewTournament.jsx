const NewTournament = () => {
  return (
    
    <div className='w-full h-screen flex items-center justify-center py-16 font-dynapuff text-yellow-01'>
      <div className='flex flex-col gap-y-4 text-xl font-semibold text-yellow-01'>
            <h2>New Tournament</h2>
            <div>
                <form className="flex flex-col gap-y-4">
                    <input placeholder="Give a name" className="p-2 border-3 border-yellow-300/40 rounded-[10px]" />
                    <input type="date" placeholder="Give a name" className="p-2 border-3 border-yellow-300/40 rounded-[10px]" />
                    <input placeholder="Give a name" className="p-2 border-3 border-yellow-300/40 rounded-[10px]" />
                    <button className="bg-yellow-01 text-purple-01 p-2 rounded-[10px]">Save</button>
                    <button className="border-yellow-01 border-2 text-yellow-01 p-2 rounded-[10px]">Cancel</button>


                </form>
            </div>
        </div>
    </div>
  )
}
export default NewTournament