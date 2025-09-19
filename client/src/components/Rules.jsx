import React from 'react'
import { carromRules } from '../assets/data/rules';
import RuleCard from './RuleCard';
import { Search } from 'lucide-react';

const Rules = () => {
  return (
    <div>
      <div className="w-full flex gap-x-2 items-center p-2 mb-4 rounded-md border-2 border-dark-white/10 text-dark-white focus-within:border-dark-white/40 ">
        <Search className='text-dark-white/50' size={18}/>
        <form>
          <input type="text" placeholder="Search rules..." className='focus:outline-none' />
        </form>
      </div>
      <div className="flex flex-col gap-y-6">
        {carromRules.map((rule, index) => (
          <RuleCard key={index} rule={rule} />
        ))}
      </div>
    </div>
  );
}

export default Rules