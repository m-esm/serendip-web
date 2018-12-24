import { ServerEndpointInterface, Server } from "serendip";
import * as _ from "underscore";

export class StatusController {
  constructor() {}

  clusterTesting: ServerEndpointInterface = {
    publicAccess: true,
    route: "/api/server/cluster-testing",
    method: "get",
    actions: [
      (req, res, next, done) => {
        res.write("received in worker " + Server.worker.id);
        res.end();
      }
    ]
  };

  routes: ServerEndpointInterface = {
    method: "get",
    publicAccess  : true,
    actions: [
      (req, res, next, done) => {
        setTimeout(() => {
          next();
        }, 200);
      },
      (req, res, next, done) => {
        var model = _.map(Server.routes, route => {
          route = _.omit(route, "controllerObject");

          return route;
        });
        res.json(model);
      }
    ]
  };

  services: ServerEndpointInterface = {
    method: "get",
    publicAccess  : true,
    actions: [
      (req, res, next, done) => {
        var model = _.keys(Server.services);
        res.json(model);
      }
    ]
  };
}
