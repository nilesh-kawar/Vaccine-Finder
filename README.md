<h1 align="center"> Vaccine Finder <br>
</h1>
<p align="center">
 <img src="https://camo.githubusercontent.com/a3ddc56e11d8ceead4484434d8d24835f9de610c940f6886338f5df93631285b/68747470733a2f2f76697369746f722d62616467652e6c616f62692e6963752f62616467653f706167655f69643d76616363696e652d617661696c6162696c6974792d74656c656772616d2d6e6f746966696572" /> </p>

<p align="center"> 
Hello Everyone 👋,
I have developed a telegram bot that sends a notification to the user about slots available on the CoWIN portal for coronavirus vaccination. <br> The bot updates the person via notification once the slot is made available on the CoWIN portal. The message has information on which center has the available slots, the number of slots available, and the date of availability.
</p>
 
 <p align="center"><b><a target="_blank" href="https://t.me/vf_thane">Check it out!</a><b></p>
 
<hr>
 
 ## Script Setup
 You can also run the local script with your own configurations.
 
 ### Clone this Repository
 ```
 https://github.com/nilesh-kawar/Vaccine-Finder.git
 ```
 
 ### Navigate to the cloned directory & install the dependencies
 ```bash
 npm install
 ```
 
 ### Update environment variables
 Open the file <i>.env</i> and replace the dummy values with a legitimate Telegram Bot Key, Telegram Chat ID, PORT, District ID and MongoDB URL.
 ```
 API_TOKEN= #You can get your telegram token from bot father on telegram.
 CHAT_ID= #Create a new group on telegram and add a chat id of that group here
 PORT= #Assign a port 
 DISTRICT_ID= #Find your District Id: https://apisetu.gov.in/api/cowin#/Metadata%20APIs/states
 MONGODB_URL= mongodb://localhost:27017/{Database Name}
 ```
 
 ### Run the script
 ```bash
 node index.js
 ```
 
 
 

