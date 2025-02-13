import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VelocityModule } from './velocity/velocity.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

import { AuthenticationMiddleware } from './auth/authentication.middleware';

@Module({
  imports: [VelocityModule, RoadmapModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  auth0Disabled: boolean;

  constructor(config: ConfigService) {
    this.auth0Disabled = JSON.parse(config.get('AUTH0_DISABLED')); // Trick to convert string to boolean
  }

  public configure(consumer: MiddlewareConsumer) {
    if (this.auth0Disabled !== true) {
      consumer
        .apply(AuthenticationMiddleware)
        .forRoutes(
          { path: '/velocity', method: RequestMethod.GET },
          { path: '/roadmap', method: RequestMethod.GET },
        );
    }
  }
}
