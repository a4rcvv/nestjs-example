import { SetMetadata, Type } from '@nestjs/common';
import { PolicyHandler } from 'src/casl/casl.guard';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: Type<PolicyHandler>[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
