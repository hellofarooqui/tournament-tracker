import Poll from "../models/poll.js";

export const createPoll = async (req, res) => {
    try {
       
        const newPoll = await Poll.create({
            title: req.body.title,
            nominations: req.body.nominations,
            owner: req.user.id
        })

        if (!newPoll) {
            return res.status(400).json({ message: "Could not create poll" });
        }

        return res.status(200).json({ message: "Poll Created" });
    }
    catch (error) {
        console.error("Error creating poll:", error);
        return res.status(500).json({ message: "Server error" });
    }

}

export const addVote = async (req, res) => {

    const { firstNominee, secondNominee } = req.body
    const nominations = [firstNominee, secondNominee]

    const { pollId } = req.params

    try {
        const poll = await Poll.findById(pollId)

        if (!poll) {
            return res.status(404).json({ msg: "Poll Not Found" })
        }

        nominations.forEach(nominee => {
            poll.nominations.forEach(entry => {
                if (entry.user == nominee) {
                    entry.votes = entry.votes + 1
                }
            })
        }

        )

        poll.voters.push(req.user.id)

        await poll.save()

        return res.status(200).json({ msg: "Votes submitted" })

    }
    catch (error) {
        console.log("Error in voting", error)
        return res.status(500).json("Something went wrong")
    }
}

export const getPollResults = async (req, res) => {
    const { pollId } = req.params

    try {
        const poll = await Poll.findById(pollId).populate([
            {
                path: "nominations",
                populate: {
                    path: "user",
                    select: "firstName lastName"
                }
            },
            {
                path: "voters"
            },
            {
                path: "owner",
                select: "firstName lastName"
            }
        ])

        if (!poll) {
            return res.status(404).json({ msg: "Poll Not Found" })
        }


        return res.status(200).json(poll);
    }
    catch (error) {

    }


}

export const getNominations = async (req, res) => {
    try {
        const { pollId } = req.params;
        const poll = await Poll.findById(pollId).populate({
            path: 'nominations',
            populate: { path: 'user', select: 'firstName lastName' } // Populate userId with firstName and lastName
        });

        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        //poll.populate('nominations', 'firstName lastName').execPopulate();

        return res.status(200).json(poll.nominations);
    } catch (error) {
        console.error("Error fetching nominations:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
