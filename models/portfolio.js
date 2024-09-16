import mongoose from "mongoose";

const introSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Intro = mongoose.model("Intro", introSchema);

export default Intro;
