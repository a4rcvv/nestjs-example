import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
  Type,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef, Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CHECK_POLICIES_KEY } from 'src/casl/decorator';

export interface PolicyHandler {
  handle(ability: AppAbility): boolean;
}

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private reflector: Reflector,
    private moduleRef: ModuleRef, // Providerへの参照を持っているらしい．moduleRef経由でDIができる？
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<Type<PolicyHandler>[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId(
      context.switchToHttp().getRequest(),
      contextId,
    );

    const policyHandlerInstances: PolicyHandler[] = [];
    for (const handler of policyHandlers) {
      const policyScope = this.moduleRef.introspect(handler).scope;
      let policyHandlerInstance: PolicyHandler;
      if (policyScope === Scope.DEFAULT) {
        policyHandlerInstance = this.moduleRef.get(handler, { strict: false }); // handlerのインスタンスを取得
      } else {
        policyHandlerInstance = await this.moduleRef.resolve(
          handler,
          contextId,
          { strict: false },
        ); // handlerのインスタンスを取得 contextIdが必要な理由はよくわかってない
      }
      policyHandlerInstances.push(policyHandlerInstance);
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;
    const ability = this.caslAbilityFactory.createForUser(user);
    return policyHandlerInstances.every((handler) => handler.handle(ability));
  }
}
