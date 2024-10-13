const validator = require("validator");

const validate = async (req) => {
    const { emailId, password } = req.body;

    console.log(req.body);

   
    
        if (!emailId) {
            throw new Error("Enter the Email!!");
        }

        else if (!password) {
            throw new Error("Enter the password!!");
        }

        const validMail = await validator.isEmail(emailId);
        const validPass = await validator.isStrongPassword(password);

        if (!validMail)
            throw new Error("Enter a valid Email!!✉️");
        else if (!validPass)
            throw new Error("Enter a valid password");
  
};

module.exports = validate;
