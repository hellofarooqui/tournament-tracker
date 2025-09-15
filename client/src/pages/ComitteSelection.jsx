import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import useTournamnet from '../hooks/useTournamnet'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'
import { VoteContext } from '../context/VoteContext'
import PollResults from '../components/PollResults'
import usePolls from '../hooks/usePolls'

const server = import.meta.env.VITE_SERVER_URL;

const CommitteeSelection = () => {
    const { token,user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { } = useTournamnet()

    const [voted,setVoted] = useState(false)
    const [voteSubmitted, setVoteSubmitted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pollResults, setPollResults] = useState(null)
    const [nominations, setNominations] = useState([])
    
    // Form state
    const [firstNominee, setFirstNominee] = useState('DEFAULT')
    const [secondNominee, setSecondNominee] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const { getPollResults } = usePolls()

    const fetchData = async () => {
        try {
            const [results, users] = await Promise.all([
                fetchElectionResults(), 
                fetchNominations()
            ])
            
            if (results) {
                setPollResults(results)
            }
            if (users) {
                //console.log("Nominations fetched:", users)
                setNominations(users)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
            setError("Error fetching data")
        } finally {
            setLoading(false)
        }
    }

    //68c871f4b44f1f9dcefd0683

    const fetchElectionResults = async () => {
        try {
            const response = await getPollResults("68c871f4b44f1f9dcefd0683")
            
            if (response) {
                //console.log("Election results fetched:", response)
                return response
            }
        } catch (error) {
            console.error("Error fetching election results:", error)
            throw new Error("Error fetching election results")
        }
    }

    const fetchNominations = async () => {
        try {
            const response = await axios.get(
                `${server}/api/poll/68c871f4b44f1f9dcefd0683/get-nominations`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }   
                }   
            )
            
            if (response && response.data) {
                return response.data
            }
        } catch (error) {
            console.error("Error fetching users list:", error)
            throw new Error("Error fetching users list")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validation
        if (firstNominee === 'DEFAULT' || !firstNominee) {
            setError("Please select a first nominee")
            return
        }
        
        if (!secondNominee) {
            setError("Please select a second nominee")
            return
        }
        
        if (firstNominee === secondNominee) {
            setError("Please select different nominees")
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            // Replace with your actual vote submission endpoint
            const response = await axios.post(
                `${server}/api/poll/68c871f4b44f1f9dcefd0683/vote`,
                {
                    firstNominee,
                    secondNominee
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (response.status === 200) {
                setVoteSubmitted(true)
                // Optionally navigate or show success message
                console.log("Vote submitted successfully")
            }
        } catch (error) {
            console.error("Error submitting vote:", error)
            setError("Error submitting vote. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    // Get available nominees for second selection (excluding first nominee)
    const getAvailableSecondNominees = () => {
        return nominations.filter(nominee => nominee.user._id !== firstNominee)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(()=>{
        if(pollResults && pollResults.voters.find(voter => voter._id == user._id)){
            setVoted(true)
        }
    },[pollResults])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className='text-stone-700 animate-spin' size={24} />
            </div>
        )
    }

    if (voteSubmitted) {
        return (
            <div className='flex flex-col gap-y-4 items-center'>
                <h2 className='text-stone-700 text-2xl font-bold'>Thank you for voting!</h2>
                <p className='text-stone-600'>Your vote has been submitted successfully.</p>
                <button 
                    onClick={() => navigate("/")} 
                    className='bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors'
                >
                    Go Back to Home
                </button>
            </div>
        )
    }

    if(voted){
        return <PollResults/>
    }

    if(error){
        setTimeout(()=>{
            navigate("/")
        },2000)
        return <p className='text-red-700'>Error in fetching data... <br/>Redirecting to Home</p>
    }

    return (
        <div className='flex flex-col gap-y-4'>
            <h2 className='text-stone-700 text-2xl font-bold'>Committee Election Poll</h2>
            
            {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='flex flex-col gap-y-6 w-full h-full bg-white rounded-[10px] shadow-md overflow-hidden p-6'>
                <div>
                    <label className='text-stone-600 font-semibold'>Select First Nominee:</label>
                    <select 
                        value={firstNominee}
                        onChange={(e) => {
                            setFirstNominee(e.target.value)
                            // Reset second nominee if it's the same as first
                            if (secondNominee === e.target.value) {
                                setSecondNominee('')
                            }
                        }}
                        className='w-full p-2 rounded-lg border-2 border-neutral-300 mt-1 text-stone-500'
                        required
                    >
                        <option value="DEFAULT">--Select First Nominee--</option>
                        {nominations && nominations.map((nominee) => (
                            <option key={nominee.user._id} value={nominee.user._id}>
                                {nominee.user.firstName} {nominee.user.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='text-stone-600 font-semibold'>Select Second Nominee:</label>
                    <select 
                        value={secondNominee}
                        onChange={(e) => setSecondNominee(e.target.value)}
                        className='w-full p-2 rounded-lg border-2 border-neutral-300 mt-1 text-stone-500'
                        required
                        disabled={firstNominee === 'DEFAULT'}
                    >
                        <option value="">--Select Second Nominee--</option>
                        {getAvailableSecondNominees().map((nominee) => (
                            <option key={nominee.user._id} value={nominee.user._id}>
                                {nominee.user.firstName} {nominee.user.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-y-2 items-center mt-4'>
                    <button 
                        type='submit' 
                        disabled={submitting || firstNominee === 'DEFAULT' || !secondNominee}
                        className='w-full bg-gradient-to-r from-stone-800 to-stone-700 text-white py-2 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                    >
                        {submitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin" size={16} />
                                Submitting...
                            </div>
                        ) : (
                            'Submit Vote'
                        )}
                    </button>
                    <button 
                        onClick={() => navigate(-1)} 
                        type='button' 
                        className='w-full bg-neutral-200 text-stone-600 py-2 rounded-lg hover:scale-105 transition-transform'
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommitteeSelection