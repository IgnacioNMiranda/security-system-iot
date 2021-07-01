import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Report = mongoose.model("report", reportSchema);

export { Report };
