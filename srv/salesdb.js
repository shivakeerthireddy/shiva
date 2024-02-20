const cds = require("@sap/cds");
//const urlRegex = '/^(ftp|http|https):\/\/[^ "]+$/';
module.exports = cds.service.impl(function () {
    const { Businesspartner, States } = this.entities();
    this.before(["CREATE"], Businesspartner, async (req) => {
       
    
        let query1 = SELECT.from(Businesspartner).where({ ref: ["pincode"] }, "=", {
          val: req.data.pincode,
        });
        result = await cds.run(query1);
        console.log(result);
        if (result.length > 0) {
          req.error({
            code: "STEMAILEXISTS",
            message: "Store with such pincode already exists",
            target: "pincode",
          });
        }
        const { imgurl } = req.data;

        // Check if the imgurl is a valid URL
        /*
        if (!isValidImageUrl(imgurl)) {
            req.error({
                code: "INVALID_IMGURL",
                message: "Invalid image URL format",
               
            });
        }
        */

      });
    
      
    
    this.on('READ',States,async(req)=>{
        states = [
          {"code":"Ts","description":"Telangana"},
          {"code":"Ap","description":"Andhra"},
          {"code":"Bengulur","description":"Karnataka"}
        ]
        states.$count=states.length;
        return states;
      })
})