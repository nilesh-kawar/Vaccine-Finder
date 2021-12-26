require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require("axios");
const schedule = require('node-schedule');
const express = require("express");
const expressApp = express();

const API_TOKEN = process.env.API_TOKEN;
const chat_id = process.env.CHAT_ID; 
const PORT = process.env.PORT;
const bot = new Telegraf(API_TOKEN);
const district_id = process.env.DISTRICT_ID //Mumbai

const newSlots = require('./util/slots');
const {getOldSlots, updateNewSlots} = require('./util/dbmodules');
let telegram_url = `https://api.telegram.org/bot${API_TOKEN}/sendMessage`


// Function: Update data every 10 second 
const job = schedule.scheduleJob('*/10 * * * * *', function(){
    (async () => {
        const oldData = await getOldSlots(chat_id);
        const newData = await newSlots(chat_id, district_id); 
            
        comparer = (oldArr) => {
            return (newArr) => {
                return oldArr.filter((old) => {
                    return  old.name == newArr.name &&  old.session_id == newArr.session_id 
                }).length == 0;
            }
        }
            
        updateNewSlots(chat_id, newData);
        
        let latestSlots = newData.filter(comparer(oldData));
            
        latestSlots.forEach((item) => {
        if(latestSlots.length > 0){
            if(item.available > 10){

            let message = `
<b>✅ New Slot Available</b>
                
<b>Vaccine:</b> <b> ${item.vaccine} </b>
<b>Date: </b> ${item.date}
<b>Pin Code:</b> ${item.pincode}

${item.district_name}
<b>Age Group:</b> <b> ${item.age}+ </b>
                    
<b>Center Name: </b> ${item.name}
<b>Address: </b> ${item.address}
                    
<b>Available Capacity Dose 1:  ${item.dose1} </b> 
<b>Available Capacity Dose 2:  ${item.dose2} </b> 
                
Fee:<b> ${item.fee} </b>

`
            axios.post(telegram_url,{
                chat_id: chat_id,
                text: message,
                parse_mode: 'HTML',
                reply_markup: {
                    "resize_keyboard": true,
                        "inline_keyboard": [
                        [
                            {
                            "text": "Book on Cowin",
                            "url": "https://selfregistration.cowin.gov.in/"
                            }
                        ]
                    ]
                }
            }).then(res => {
                        output = res.data.result.text;
            }).catch(err => {
                console.log(err);
            })  
            }
        }
        })
        
        var d = new Date();          
        var currentDateTime = d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }, { hour12: true});
        
        console.log(`New Slots Found: ${latestSlots.length} --- On: ${currentDateTime}`);

        return latestSlots;
    })();         
});


// bot.launch()

expressApp.get('/', (req, res) => {
    res.send('Your bot is running')
});
expressApp.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
