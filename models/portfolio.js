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
  active: {
    type: Boolean,
  },
  description: {
    type: String,
  },
});

const projectsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  technologies: {
    type: Array,
    required: true,
  },
  project_image: {
    type: String,
    required: true,
  },
  github_link: {
    type: String,
    required: true,
  },
  live_link: {
    type: String,
    required: true,
  },
});

const ratingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rating: [
    {
      score: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  feeback: {
    type: String,
  },
});

const intro = mongoose.model("intro", introSchema);
const experiences = mongoose.model("experience", experienceSchema);
const projects = mongoose.model("project", projectsSchema);
const ratings = mongoose.model("rating", ratingSchema);

export { intro, experiences, projects, ratings };
