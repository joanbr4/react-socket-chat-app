import "dotenv/config";
import mongoose, { ConnectOptions, Schema, model } from "mongoose";
import { IdataRegister } from "../../domain/model";
import bcrypt from "bcrypt";

// let uri = "mongodb://172.18.0.2";
// let uri = "mongodb://localhost:8081";
// let uri = "mongodb://127.0.0.1";
let uri = "mongodb://root:example@localhost:8081";
// let uri = "mongodb://root:example@mongo:8081";
// let uri = "mongodb://mongo:8081"
// let uri = "mongodb://root:example@127.0.0.1/"
// mongoose.set("useNewUrlParser", true)
mongoose
  .connect(
    uri
    //   {
    //   user: "root",
    //   pass: "example",
    //   dbName: "sprint7",
    // }
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  });

const saltRounds = 8;

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  genere: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

UserSchema.pre("save", async function (next) {
  // const user = this

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password as string, saltRounds);
  }
  next();
});

const UserModel = model<IdataRegister>("User", UserSchema);

export { UserModel };
