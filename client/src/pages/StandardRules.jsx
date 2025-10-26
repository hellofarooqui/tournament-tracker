import RuleCard from '../components/RuleCard'
import {carromRules} from './../assets/data/rules'

const StandardRules = () => {
  return (
   <div className="w-full h-screen flex py-16 font-dynapuff">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-y-8 text-xl font-semibold text-light-brown-03 p-4">
        {carromRules.map((rule, index) => (
            <RuleCard key={index} rule={rule} />
        ))}
      </div>
    </div>
  )
}
export default StandardRules