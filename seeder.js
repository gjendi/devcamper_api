const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

//Load models
const Bootcamp = require("./models/Bootcamp");

//Connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Read json files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//Import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data imported to db");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Delete from db
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data deleted from db");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d"){
  deleteData();
}
