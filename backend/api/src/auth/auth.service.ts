import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "prisma/prisma.service"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { SignupDto } from "./dto/signup.dto"
import { LoginDto } from "./dto/login.dto"

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) {}

  async signup(dto: SignupDto) {

    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (existing) {
      throw new BadRequestException("Email already exists")
    }

    const hashed = await bcrypt.hash(dto.password, 10)

    const org = await this.prisma.organization.create({
      data: {
        name: dto.organizationName
      }
    })

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        organizationId: org.id
      }
    })

    const token = jwt.sign(
      { userId: user.id, orgId: org.id },
      process.env.JWT_SECRET || "secret"
    )

    return { token }
  }

  async login(dto: LoginDto) {

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (!user) {
      throw new BadRequestException("Invalid credentials")
    }

    const match = await bcrypt.compare(dto.password, user.password)

    if (!match) {
      throw new BadRequestException("Invalid credentials")
    }

    const token = jwt.sign(
      { userId: user.id, orgId: user.organizationId },
      process.env.JWT_SECRET || "secret"
    )

    return { token }
  }

}