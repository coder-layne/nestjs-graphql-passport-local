import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: any, id?: any) => void): void {
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
    done(null, payload);
  }
}
