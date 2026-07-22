import addressModel from "../models/Address.js";

//save address
export const saveAddress = async (req,res) =>{
    try {
        const address = await addressModel.create(req.body);
        res.json({
            message:"address saved successfully",
            address
        })
    } catch (error) {
        res.status(500).json({
            message:"error saving address",
            error
        })
    }
}
//get addresses by user id
export const getAddressByUserId = async (req,res) =>{
    try {
        const addresses  = await addressModel.find({
            userId:req.params.userId
        })
        res.json(addresses)
    } catch (error) {
         res.status(500).json({
            message:"error fetching address",
            error
        })
    }
}