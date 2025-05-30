import { createGroup, defineRoute, createRouter, type Route } from "type-route";
import { appPath } from "urls";

export const routeDefs = {
    page404: defineRoute(appPath + "/404")
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;

export const getDoRequireUserLoggedIn: (route: PageRoute) => boolean = () => false;
