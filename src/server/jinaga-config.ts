import { authorizeUser } from "@shared/model/user";
import { authorizeVisit } from "@shared/model/visit";
import { Express, Handler } from "express";
import { AuthorizationRules } from "jinaga";
import { JinagaServer } from "jinaga-server";

export function configureJinaga(app: Express, authenticate: Handler) {
  const pgConnection = process.env.JINAGA_POSTGRESQL ||
        'postgresql://dev:devpw@localhost:5432/myapplication';
  const { handler } = JinagaServer.create({
    pgKeystore: pgConnection,
    pgStore: pgConnection,
    authorization: configureAuthorization
  });

  app.use('/jinaga', authenticate, handler);
}

function configureAuthorization(a: AuthorizationRules) {
  return (a
    .with(authorizeVisit)
    .with(authorizeUser)
  );
}
