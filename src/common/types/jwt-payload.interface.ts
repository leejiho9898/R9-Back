export interface JwtPayload {
	aud?: string;
	exp?: number;
	iss?: string;
	jti?: string;
	sub?: string;
}
