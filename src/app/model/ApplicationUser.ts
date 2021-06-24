import { Role } from "./Role"

export class ApplicationUser {
    id?: string

    username?: string

    userName?: string

    normalizedUserName?: string

    email?: string

    normalizedEmail?: string

    emailConfirmed?: boolean

    passwordHash?: string

    securityStamp?: string

    concurrencyStamp?: string

    phoneNumber?: string

    phoneNumberConfirmed?: boolean

    twoFactorEnabled?: boolean

    lockoutEnd?: Date

    lockoutEnabled?: boolean

    accessFailedCount?: number

    nombre?: string

    foto?: string

    roles?: []

}