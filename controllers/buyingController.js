const stripe = require("stripe")(
  "sk_test_51NiJyfH0IkXldde8uFZgJdDInCRjmqMOewtYEONVitYKVz3pNrjrpkFrj7AID9f1AXQXFmCwMqBsCyEqBPjK0wII00Q9QtNw3D"
);
const Course = require("./../models/courseModel");

exports.getCheckoutSession = async(req, res, next) => {
    try{
      // 1- Get the currently course
      const course = await Course.findById(req.params.courseID);

      // 2- Create checkout session
      const session = await stripe.checkout.sessions.create({
        //Information about session
        payment_method_types: ["card"],
        success_url: `${req.protocol}://${req.get("host")}/`,
        //success_url: `http://localhost:5173/test`, //checkout-success
        // cancel_url: `${}`
        customer_email: req.user.email,
        client_reference_id: req.params.courseID,

        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${course.title} Course`,
                description: course.description,
                //images: course.photo,
              },
              unit_amount: course.price * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
      });
      //console.log(session);

      // 3- Create session as response to send to the client
      res.status(200).json({
        status: "Success",
        session,
      });
    }catch(err){
        res.status(404).json({
          status: "Faild",
          message: err,
        });
    }
};
