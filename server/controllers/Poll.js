const Poll = require('../models/Poll.js')
const mongoose = require('mongoose');

const postPoll = async (req, res, next) => {
    try {
        const { pollTitle, belongsToCommunity, communityID, option1, option2, option3, totalOptionConsensus } = req.body;

        const poll = new Poll({
            _id: new mongoose.Types.ObjectId(),
            pollTitle: pollTitle,
            belongsToCommunity: belongsToCommunity,
            communityID: communityID,
            option1: option1,
            option2: option2,
            option3: option3,
            totalOptionConsensus: totalOptionConsensus
        })

        const result = await poll.save()
        console.log("Poll Got Posted : ", result);
        console.log("The id would be: ", result._id)

        res.status(200).json({
            data: result._id,
            custom: "Poll Posted!!"
        })

    } catch (err) {
        console.log(err);
        res.status(403)
            .json({
                custom: "Error in posting the Poll"
            });
    }
};

const getAllPolls = async (req, res, next) => {
    try {
        const result = await Poll.find().exec()
        res.status(200).json({
            data: result,
            custom: "Fetched all polls!!"
        })

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching Polls"
        });
    }
}

const getAllPublicPolls = async (req, res, next) => {
    try {
        const result = await Poll.find({ belongsToCommunity: false });

        res.status(200).json({
            data: result,
            custom: "Fetched all public polls!!"
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching public polls"
        });
    }
};

const getAllPollsByCommunityID = async (req, res, next) => {
    try {
        const { communityID } = req.body;
        const result = await Poll.find({ communityID: communityID })

        res.status(200).json({
            data: result,
            custom: "Fetched all polls of the community ID!!"
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({
            custom: "Error in fetching all polls of the community ID"
        });
    }
};


module.exports = { postPoll, getAllPolls, getAllPublicPolls, getAllPollsByCommunityID };