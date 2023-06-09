export type UserLoginType = {
  username: string
  password: string
}

export type UserType = {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}

export type RegisterType = {
  username: string
  password: string
  check_password: string
}

export type RegisterResultType = {}
