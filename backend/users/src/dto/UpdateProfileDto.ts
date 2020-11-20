import { IsNotEmpty } from 'class-validator'

export class UpdateProfileDto {
    @IsNotEmpty() public readonly firstName: string
    @IsNotEmpty() public readonly lastName: string
}
