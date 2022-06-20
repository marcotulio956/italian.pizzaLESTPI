import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    const { db } = await dbConnect()

    if (method === "GET") {
        try {
            const users = await db.collection("users").find().toArray()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "PUT") {
        try {
            const user = await db.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;
