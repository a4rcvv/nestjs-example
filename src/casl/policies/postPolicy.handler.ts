import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { PolicyHandler } from 'src/casl/casl.guard';
import { Post } from 'src/post/entities/post.entity';

export class EditPostPolicyHandler implements PolicyHandler {
  constructor(private post: Post) {}
  handle(ability: AppAbility): boolean {
    if (!this.post) return false;
    return ability.can(Action.Update, this.post);
  }
}

export class DeletePostPolicyHandler implements PolicyHandler {
  constructor(private post: Post) {}
  handle(ability: AppAbility): boolean {
    if (!this.post) return false;
    return ability.can(Action.Delete, this.post);
  }
}
