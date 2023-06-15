import {describe,it,expect} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
            },
            
            async createUser(data) {
                return{
                    id:'user-1',
                    name:data.name,
                    email:data.email,
                    password_hash:data.password_hash,
                    created_at: new Date(),
                }
            },
        }) // service

        const {user} = await registerUseCase.execute({
            name:'Kelvin',
            email:'qwerty@gmail.com',
            password:'123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})