const mongoose = require("mongoose");
const user = require("./models/User");
require("dotenv").config();
mongoose.set('strictQuery', false);

mongoose
    .connect(process.env.mongoURI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB", err));

const seedAdmin = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: "$2b$10$i3CTXQpFOFWEZlZjQIRAi.hGgwSzPkNhwbExv/fbBQNerjooUTvDS"//1234
    },
    {
        name: "Test",
        email: "test@gmail.com",
        password: "$2b$10$i3CTXQpFOFWEZlZjQIRAi.hGgwSzPkNhwbExv/fbBQNerjooUTvDS"
    },
];

const seedDb = async () => {
    await user.deleteMany({});
    await user.insertMany(seedAdmin);
};

seedDb().then(() => {
    mongoose.connection.close();
});
