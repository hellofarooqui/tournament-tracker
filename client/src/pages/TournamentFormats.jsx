import React from 'react'
import useSettings from '../hooks/useSettings';
import { Loader2, Plus } from 'lucide-react';
import { useEffect } from 'react';

const TournamentFormats = () => {
    const { addTournamentFormat, getTournamentFormats } = useSettings();
    const [formats, setFormats] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [newFormat, setNewFormat] = React.useState({
        name: "",
        description: "",
        rules: []
    });
    const [showNewFormatForm, setShowNewFormatForm] = React.useState(false);

    const fetchFormats = async () => {
        try {
            const formats = await getTournamentFormats();
            console.log("Fetched formats:", formats);
            if (formats) {
                setFormats(formats);
                setLoading(false);
            }
        }
        catch (error) {
            console.error("Error fetching formats:", error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleAddFormatSubmit = async (e) => {
        e.preventDefault();
        try {
            const added = await addTournamentFormat(newFormat);
            if (added) {
                setFormats([...formats, added]);
                setNewFormat({ name: "", description: "", rules: [] });
            }
        }
        catch (error) {
            console.error("Error adding format:", error);
        }
    }

    useEffect(() => {
        fetchFormats();
    }, [])

    if (loading) {
        return (<div className='w-screen h-screen flex justify-center items-center'>
            <Loader2 className='animate-spin' />
        </div>)
    }

    return (
        <div className="w-screen h-screen fixed flex  py-16">
            <div className="w-full h-full bg-neutral-100 rounded-t-[20px] mx-auto flex flex-col gap-y-4 text-xl font-semibold text-slate-200 p-6  overflow-y-scroll">

                <div className='flex flex-col gap-y-4'>
                    <div className='w-full flex flex-col justify-between items-center'>
                        <div className='w-full flex justify-between items-center gap-x-2'>
                            <h2 className='text-stone-700 text-2xl font-bold'>Tournament Formats</h2>
                            <button onClick={() => setShowNewFormatForm(true)} className='text-stone-100 bg-stone-700 p-1 rounded-full'><Plus /></button>
                        </div>
                        {showNewFormatForm && <div className='mt-4 bg-white p-4 rounded-lg shadow-md w-full'>
                            <form onSubmit={handleAddFormatSubmit} className='w-full flex flex-col gap-y-4'>
                                <input className='text-stone-600 border p-1 rounded-[5px] border-stone-400' placeholder='Enter name' value={newFormat.name} onChange={(e) => setNewFormat({ ...newFormat, name: e.target.value })} />
                                <textarea className='text-stone-600 border p-1 rounded-[5px] border-stone-400 resize-none' placeholder='Enter description' value={newFormat.description} onChange={(e) => setNewFormat({ ...newFormat, description: e.target.value })} />
                                <div className='flex gap-x-2 mt-2'>
                                    <button type='submit' className='flex-1 bg-stone-700 text-stone-100 p-2 rounded-lg' >Add Format</button>
                                    <button type='button' onClick={() => setShowNewFormatForm(false)} className='flex-1 bg-stone-200 rounded-lg text-stone-600'>Cancel</button>
                                </div>
                            </form>
                        </div>}
                    </div>
                    {formats.map((format) => (
                        <div key={format._id} className='bg-white p-4 rounded-lg shadow-md my-2'>
                            <h3 className='text-2xl font-bold text-stone-700'>{format.name}</h3>
                            <p className='text-stone-500 text-sm mt-2'>{format.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TournamentFormats