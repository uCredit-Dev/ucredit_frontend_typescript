const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*  
    This model refers to a student's academic major, and stores
    distribution requirements.
    Criteria symbol: 
      [C] = Course Number
      [D] = Department
      [T] = Tags
      [L] = Level
      [A] = Area
      [Y] = Before Program start term(e.g. Fall 2019)
      [N] = Part of the name of the course
*/
const majorSchema = new Schema({
  degree_name: { type: String, required: true }, //e.g. B.S. Computer Science
  department: { type: String, required: true },
  total_degree_credit: { type: Number, required: true },
  wi_credit: { type: Number, required: true },
  distributions: [
    {
      name: { type: String, required: true },
      required_credits: { type: Number, required: true },
      min_cedits_per_course: { type: Number, required: true },
      description: { type: String, required: true },
      criteria: { type: String, required: true },
      user_select: { type: Boolean, default: false }, //if true, user can put any course into this distribution
      double_count: { type: Boolean, default: false }, //courses being classified to this distribution might also be double counted for another distribution
      exception: { type: String }, //course that match the exception expression cannot be added toward this distirbution
      fine_requirements: [
        {
          description: { type: String, required: true },
          required_credits: { type: Number, required: true },
          criteria: { type: String, required: true },
          exception: { type: String },
          exclusive: { type: Boolean, default: false },
        },
      ],
    },
  ],
});
