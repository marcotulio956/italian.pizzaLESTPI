import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    const { db } = await dbConnect()

    if (method === "GET") {
        try {
            const orders = await db.collection("orders").find().toArray()
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "PUT") {
        try {
            const order = await db.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;