import Request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"

describe("UsersController",()=>{
  let userId: string

  afterAll(async()=>{
    await prisma.user.delete({
      where:{
        id: userId
      }
    })
  })

  it("insert users successfully",async()=>{
    const response = await Request(app).post("/users").send({
      name: "teste",
      email: "teste@example.com",
      password: "123456789"
    })

    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe("teste")
    expect(response.body).toHaveProperty("id")

    userId = response.body.id
  })
})