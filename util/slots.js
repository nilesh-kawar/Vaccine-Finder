const axios = require("axios");
const config = {
    method: 'get',
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'}
}

const currentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today
}

const newSlots = async (chat_id, district_id) => {
    try {
        date = currentDate();
        const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`;
        const res = await axios(url, config);
        centers = res.data.centers;
        slotsArr = [];
        centers.forEach((item) => {
            item.sessions.forEach((session) => {
                    if(session.available_capacity > 0){
                        let centerData = {
                            session_id : session.session_id,
                            date: session.date,
                            name: item.name,
                            age: session.min_age_limit,
                            address: item.address,
                            pincode: item.pincode,
                            district_name: item.district_name,
                            vaccine: session.vaccine,
                            available: session.available_capacity,
                            dose1: session.available_capacity_dose1,
                            dose2: session.available_capacity_dose2,
                            fee: (item.fee_type == "Free" ? "FREE" :
                            item.fee_type == "Paid" ?  
                            session.vaccine == "COVISHIELD" ? "₹ 780" : 
                            session.vaccine == "COVAXIN" ? "₹ 1410" : 
                            session.vaccine == "SPUTNIK V" ? "₹ 1145" :0 : 0),
                            feetype: item.fee_type
                        }
                        slotsArr.push(centerData);
                    }
                })
        })
        return slotsArr;
    } catch (error) {
        console.log(error);
    }
}

module.exports = newSlots;

