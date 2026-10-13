const Razorpay = require('razorpay');

const apiKey = "rzp_live_SAkK1UBHwykxcB";
const apiSecret = "XtTn5uHPkh72I4N0un1UHGb9";


// const apiKey = "rzp_test_Tecx1Gx8yKOUba";
// const apiSecret = "PqBLct6wJb4tHLKOjUgjW3qc";


const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});


module.exports = razorpay;