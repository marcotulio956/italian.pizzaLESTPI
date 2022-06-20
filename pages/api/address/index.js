import connect from '../../../util/mongo'

export default async function handler(req, res) {
    const {db} = await connect()

    const response = await db.collection("address").find().toArray()

    res.status(200).json(response)
}
