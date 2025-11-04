import { IsEnum, IsString, ValidateIf, IsNotEmpty } from 'class-validator'

export class DefaultDataDto {
	@IsEnum(['login', 'uid', 'avatarUrl', 'bannerUrl'])
	type: updateUserType

	@ValidateIf(o => o.type === 'login')
	@IsString()
	@IsNotEmpty()
	newLogin?: string

	@ValidateIf(o => o.type === 'uid')
	@IsString()
	@IsNotEmpty()
	newUid?: string

	@ValidateIf(o => o.type === 'avatarUrl')
	@IsString()
	@IsNotEmpty()
	newAvatarUrl?: string

	@ValidateIf(o => o.type === 'bannerUrl')
	@IsString()
	@IsNotEmpty()
	newBannerUrl?: string
}


export type updateUserType = "login" | "uid" | "avatarUrl" | "bannerUrl"