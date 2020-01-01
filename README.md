# Chargini-using-tesseract.js-with-ionic4-in-offline-mode
From an image that carry the recharge code,the application interpret the code existed inside the card, and completes the charging process


there is some problems to get tesseract.js works on android phone.it seems that android doesn’t like .gz files . 
so to solve the problem you have to write npm i to download the files required for tesseract and then go the 
file node_modules/tesseract.js/dist/worker.min.js and then you search for every .traineddata in that file,you 
will find a function that add to the traineddata ".gz" delete that part that add that extension ".gz" to "traineddata, and then 
every thing should work great.


also if there the resulat are so so bad you have to get right trained data, the LSTM model data , you will find it 
the documentation, else you will find it in my project under "src/assets/lang-data/eng.traineddata"
