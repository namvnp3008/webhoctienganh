import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AnswerSanitizerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isTeacherOrOwner = user && (user.role === 'admin' || user.isOwner);

    return next.handle().pipe(
      map((data) => {
        if (isTeacherOrOwner || !data) {
          return data;
        }
        return this.sanitizeData(data);
      }),
    );
  }

  private sanitizeData(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeData(item));
    }

    const isTestOrAttempt = obj.answerVisibility || obj.test?.answerVisibility;
    const visibility = obj.answerVisibility || obj.test?.answerVisibility || 'hidden';
    const hideLevel = obj.answerHideLevel || obj.test?.answerHideLevel || 'keep_correctness';

    const cloned = { ...obj };

    // Strip answers if hidden
    if (visibility === 'hidden') {
      delete cloned.correctAnswers;
      delete cloned.explanation;
      if (hideLevel === 'score_only') {
        delete cloned.isCorrect;
      }
    }

    for (const key of Object.keys(cloned)) {
      if (typeof cloned[key] === 'object' && cloned[key] !== null) {
        cloned[key] = this.sanitizeData(cloned[key]);
      }
    }

    return cloned;
  }
}
