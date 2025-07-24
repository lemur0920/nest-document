import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility, MongoQuery, Subject } from '@casl/ability';
import { Action } from '../../auth/action.enum';
import { User } from '../../auth/User';
import { Article } from '../articles/article.entity'; // Article 엔티티 경로는 프로젝트에 맞게 수정 필요

type Subjects = 'all' | typeof Article;
type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    // 관리자 권한
    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      // 일반 사용자 기본 권한
      can(Action.Read, 'all');
    }

    // 작성자만 수정 가능
    can<Article>(Action.Update, 'Article', { authorId: user.id } as MongoQuery<Article>);

    // 게시된 글은 삭제 불가
    cannot<Article>(Action.Delete, 'Article', { isPublished: true } as MongoQuery<Article>);

    return build();
  }
}