import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

export function AuthticateGuard(params: { roles?: string[]; allowAnonymous?: boolean; allowSecret?: boolean; allowClientSecret?: boolean }) {
  return applyDecorators(
    SetMetadata('roles', params?.roles),
    SetMetadata('allowAnonymous', params?.allowAnonymous),
    SetMetadata('allowSecret', params?.allowSecret),
    SetMetadata('allowClientSecret', params?.allowClientSecret),
    UseGuards(JwtAuthGuard),
  );
}
