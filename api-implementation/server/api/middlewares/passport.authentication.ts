import fileAuthorizer from './file.authorizer';
import { AuthenticateOptions } from 'passport';
import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { BasicStrategy } from 'passport-http';
import { User } from '../../../src/model/user';
import { ErrorResponseInternal } from './error.handler';
import jsonPath from 'jsonpath';
import fs from 'fs';
import L from '../../common/logger';

const ENV_PREFIX_EXTRACTOR = 'AUTH_EXTRACTION'
const ENV_PREFIX_VERIFIER = 'AUTH_VERIFICATION'

const issuer = process.env[`${ENV_PREFIX_VERIFIER}_ISSUER`];
const aud = process.env[`${ENV_PREFIX_VERIFIER}_AUD`];

const userPrincipalPath = process.env[`${ENV_PREFIX_EXTRACTOR}_USER_PRINCIPAL`] || '$.upn';
const groupsPath = process.env[`${ENV_PREFIX_EXTRACTOR}_ORGS`] || '$.groups'
const rolesPath = process.env[`${ENV_PREFIX_EXTRACTOR}_ROLES`] || '$.resource_access[\'apim-connector\'].roles';

export default class PassportFactory {

  private static authOpts: AuthenticateOptions = {
    session: false,
  }

  private static asArray(value: any): string[] {
    if (Array.isArray(value)) {
      return value;
    } else if (typeof value === 'string' || value instanceof String) {
      return value.split(' ');
    }
  }

  private static getKey(): string {
    const key = process.env[`${ENV_PREFIX_VERIFIER}_KEY`];
    try {
      let keyFile = fs.readFileSync(key, 'utf8');
      return keyFile;
    } catch (e) {
      L.error(e, `Error loading JWT Signer Public Key from ${key}`);
    }
  }
  public static build(): passport.PassportStatic {


    let opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: PassportFactory.getKey(),
      ignoreExpiration: true,
      issuer: issuer,
      audience: aud,
    };
    const jwtStrategy = new Strategy(opts,
      function (jwtPayload, done) {
        L.debug(jwtPayload);
        const user: User = {
          groups: PassportFactory.asArray(jsonPath.value(jwtPayload, groupsPath)),
          jwt: jwtPayload,
          name: jsonPath.value(jwtPayload, userPrincipalPath),
          scopes: jwtPayload.scopes,
          sub: jwtPayload.sub,
          roles: PassportFactory.asArray(jsonPath.value(jwtPayload, rolesPath)),
        }
        L.debug(user);
        done(null, user);
      }
    );
    passport.use('provider', jwtStrategy);
    passport.use('basic', new BasicStrategy(
      function (username, password, cb) {
        const authenticated: User = fileAuthorizer(username, password);
        if (authenticated !== null) {
          return cb(null, authenticated);
        } else {
          return cb(new ErrorResponseInternal(401, 'User not authenticated'));
        }
      })
    );
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
    return passport;
  }

  public static getAuthenticationOptions(): AuthenticateOptions {
    return PassportFactory.authOpts;

  }
}