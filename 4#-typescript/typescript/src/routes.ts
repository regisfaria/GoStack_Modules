import { Response, Request } from 'express'
import createUser from "./services/CreateUsers"

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "teste@gmail.com",
    password: "akakaka111"
  })

  console.log(user.email)
  
  return response.json({message: "Hello world"})
}