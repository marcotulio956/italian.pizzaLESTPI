import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
    const { method } = req;

    const { db } = await dbConnect()

    if (method === "GET") {
        try {
            const orders = await db.collection("users").find().toArray();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === "POST") {
        try {
            const order = await db.collection("users").insertOne(req.body);
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;
