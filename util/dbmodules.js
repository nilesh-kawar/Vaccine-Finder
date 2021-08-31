require("../src/db/conn");
const Slot = require("../src/models/slotModel");

// Create Slots Data 
const createUser = async (chat_id) => {
    try{
        const slotDB = new Slot({
            chat_id: chat_id,
            slots: [{
                session_id: "Undefined",
                date: "Undefined",
                name: "Undefined",
                address: "Undefined",
                vaccine: "Undefined",
                pincode: 000000,
                district_name: "Undefined",
                age: 0,
                available: 0,
                dose1: 0,
                dose2: 0,
                fee: "Undefined",
            }]
        })
        
        const result = await slotDB.save();
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// Get old slots 
const getOldSlots = async (chat_id) => {
    try {
        const result = await Slot.find({chat_id: chat_id})
        .select({ _id: 0, slots:1})
        if(result.length > 0){
            sl = result[0].slots; 
            return sl
        }else{
            console.log("No data found in database! Creating Dummy User...");
            createUser(chat_id)
        }
    } catch (err) {
        console.log(err);
    }
}

// update the document 
const updateNewSlots = async (chat_id, slotArray) => {
    try {
        var d = new Date();          
        var currentDateTime = d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }, { hour12: true});
        const result = await Slot.updateOne({chat_id},{
            $set: {
                last_updated: currentDateTime,
                slots: slotArray
            }
        })
    } catch (err) {
         console.log(err);
    }
}

module.exports = {getOldSlots, updateNewSlots}