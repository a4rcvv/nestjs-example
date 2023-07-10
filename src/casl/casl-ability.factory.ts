import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

type Subjects = InferSubjects<typeof User | typeof Post> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    can(Action.Create, Post);
    cannot(Action.Update, Post);
    cannot(Action.Delete, Post);
    can(Action.Update, Post, { createdBy: user });
    can(Action.Delete, Post, { createdBy: user });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
