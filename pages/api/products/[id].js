import dbConnect from "../../../util/mongo";

export default async function handler(req, res) {
    const {
        method,
        query: { id },
        cookies
    } = req;

    const { db } = await dbConnect()

    const pizza = await db.collection("pizzas").findOne({ id: id })
    const bebida = await db.collection("bebidas").findOne({ id: id })
    const combo = await db.collection("combos").findOne({ id: id })

    let response; 

    if(pizza) {
        response = pizza;
    } else if (bebida) {
        response = bebida;
    } else if (combo) {
        response = combo;
    }

    res.status(200).json(response);
}