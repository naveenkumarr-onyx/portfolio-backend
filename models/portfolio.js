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

const experienceSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Intro = mongoose.model("Intro", introSchema);
const Experience = mongoose.model("Experience", experienceSchema);

export { Intro, Experience };
