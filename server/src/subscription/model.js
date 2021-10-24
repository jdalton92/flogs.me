import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const subscriptionSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    minlength: 3,
    present: true,
    required: true,
  },
});

subscriptionSchema.plugin(uniqueValidator);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
