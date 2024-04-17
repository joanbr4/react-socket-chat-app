import { ZodType, z } from "zod"

export type FormData = {
  name: string
  surname: string
  genere: string
  nickname: string
  email: string
  password: string
}

export const SigInSchema: ZodType<FormData> = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    surname: z.string().min(1, { message: "Surname is required" }).max(20, ""),
    genere: z.string(),
    nickname: z.string().min(1, { message: "Must be a nickname" }),
    email: z
      .string()
      .email()
      .includes(".com" || ".es" || ".cat" || ".net", {
        message: "Needs to have a valid end-email like .com",
      }),
    password: z
      .string()
      .min(6, { message: "At least 6 characters" })
      .max(20, { message: "Maximun 20 characters" }),
  })
  .refine(
    (data) =>
      data.genere === "he/him" ||
      data.genere == "she/her" ||
      data.genere == "other",
    {
      path: ["genere"],
      message: "Select one genere option",
    }
  )
