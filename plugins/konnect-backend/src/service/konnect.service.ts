import { KonnectAPI, KonnectConfig } from "./types";
import { GatewayService, Route, Plugin} from "./types";

export class KonnectService implements KonnectAPI {

    konnectConfig: KonnectConfig;

    constructor(konnectConfig: KonnectConfig) {
        this.konnectConfig = konnectConfig;
    }
    async getService(controlPlaneId: string, serviceId: string): Promise<GatewayService>{
        return fetch(`${this.konnectConfig.baseUrl}/control-planes/${controlPlaneId}/core-entities/services/${serviceId}/routes`, {
            headers: {
                Authorization: `Bearer ${this.konnectConfig.accessToken}`,
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<GatewayService>;
        });

    };
    async getRoutesByService(controlPlaneId: string, serviceId: string): Promise<Route[]>{
        return fetch(`${this.konnectConfig.baseUrl}/control-planes/${controlPlaneId}/core-entities/services/${serviceId}/routes`, {
            headers: {
                Authorization: `Bearer ${this.konnectConfig.accessToken}`,
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<Route[]>;
        });

    };
    async getPluginsByService(controlPlaneId: string, serviceId: string): Promise<Plugin[]>{
        return fetch(`${this.konnectConfig.baseUrl}/control-planes/${controlPlaneId}/core-entities/services/${serviceId}/routes`, {
            headers: {
                Authorization: `Bearer ${this.konnectConfig.accessToken}`,
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<Plugin[]>;
        });
    };
}