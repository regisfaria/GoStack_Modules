interface Techs{
  title: string
  experience: number
}

interface CreateUserData {
  name?: string
  email: string
  password: string
  techs?: Array<string | Techs>
}

export default function createUsers({ name, email, password }: CreateUserData) {
  const user = {
    name,
    email,
    password
  }

  return user
}