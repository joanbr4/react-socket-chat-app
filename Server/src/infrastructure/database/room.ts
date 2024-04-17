export const rooms = ["tecnologia", "cultural", "deportes", "adultos"]

export type RoomType = "tecnologia" | "cultural" | "deportes" | "adultos"

export const usersXroom: Record<string, Set<string>> = {
  tecnologia: new Set(),
  cultural: new Set(),
  deportes: new Set(),
  adultos: new Set(),
}
