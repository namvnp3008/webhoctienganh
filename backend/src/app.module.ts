import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TestsModule } from './modules/tests/tests.module';
import { AttemptsModule } from './modules/attempts/attempts.module';
import { AIModule } from './modules/ai/ai.module';
import { ClassesModule } from './modules/classes/classes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    TestsModule,
    AttemptsModule,
    AIModule,
    ClassesModule,
  ],
})
export class AppModule {}
