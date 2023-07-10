import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Action, CaslAbilityFactory } from './casl-ability.factory';

describe('CaslAbilityFactory', () => {
  it('should be defined', () => {
    expect(new CaslAbilityFactory()).toBeDefined();
  });

  it('can check ability', () => {
    const user = new User('test@example.com', 'test', 'pass');
    const user2 = new User('test2@example.com', 'test2', 'pass2');
    const ability = new CaslAbilityFactory().createForUser(user);
    console.log(ability);
    expect(ability.can(Action.Create, Post)).toBeTruthy();
    expect(ability.can(Action.Update, new Post('test', user))).toBeTruthy(); // インスタンスが与えられた時はTrueになってほしい
    expect(ability.can(Action.Update, new Post('test', user2))).toBeFalsy(); // 他のユーザーのインスタンスが与えられた時はFalseになってほしい
    expect(ability.can(Action.Update, Post)).toBeTruthy();
    // クラスが与えられた時はTrueになるらしい
    // 少なくとも1つのインスタンスにアクセスできる時はTrueになる(https://casl.js.org/v4/en/guide/intro#checking-logic)
  });
});
