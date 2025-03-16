import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UserController } from './modules/user/user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TaskModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService],
})
export class AppModule { }
