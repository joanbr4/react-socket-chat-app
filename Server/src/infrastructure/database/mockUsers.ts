import { UserModel } from "./mongoose"

// interface IdataRegister {
//   name: string
//   surname: string
//   nickname: string
//   genere: string
//   email: string
//   password: string
//   date: Date
// }
console.log("papa")

export const checkMockUsers = async () => {
  const mockUsers = await UserModel.find({
    email: [
      "anne.doe@gmail.com",
      "kevin.doe@gmail.com",
      "john.doe@gmail.com",
      "jane.doe@gmail.com",
    ],
  })
  if (mockUsers.length != 4) {
    UserModel.insertMany([
      {
        name: "John",
        surname: "Doe",
        nickname: "Johnny",
        genere: "He/him",
        email: "john.doe@gmail.com",
        password: "asdasd",
        date: Date.now(),
      },
      {
        name: "Jane",
        surname: "Doe",
        nickname: "Janny",
        genere: "She/her",
        email: "jane.doe@gmail.com",
        password: "asdasd",
        date: Date.now(),
      },
      {
        name: "Kevin",
        surname: "Doe",
        nickname: "Keviinn",
        genere: "he/him",
        email: "kevin.doe@gmail.com",
        password: "asdasd",
        date: Date.now(),
      },
      {
        name: "Anne",
        surname: "Doe",
        nickname: "Ann",
        genere: "she/her",
        email: "anne.doe@gmail.com",
        password: "asdasd",
        date: Date.now(),
      },
    ])
  }
}
