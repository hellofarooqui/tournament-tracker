import QuestionCard from '../components/QuestionCard'
import { carromQA } from './../assets/data/QA'

const Questions = () => {
   return (
   <div className="w-full h-screen flex py-16 font-dynapuff">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-y-4 text-xl font-semibold text-light-brown-03 p-4">
        {carromQA.map((question, index) => (
            <QuestionCard key={index} number={index} question={question} />
        ))}
      </div>
    </div>
  )
}
export default Questions