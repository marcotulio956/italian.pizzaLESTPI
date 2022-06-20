import connect from '../../../util/mongo'

export default async function handler(req, res) {
    const {db} = await connect()

    const pizzas = await db.collection("pizzas").find().toArray()
    const bebidas = await db.collection("bebidas").find().toArray()
    const combos = await db.collection("combos").find().toArray()
    const response = [pizzas, bebidas, combos]

    res.status(200).json(response)
}
  