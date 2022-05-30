import axios, { AxiosResponse } from "axios";

import { IApiProvider } from "../IApiProvider";

class ApiProvider implements IApiProvider {
  private api = axios.create();

  constructor(baseUrl: string) {
    this.api.defaults.baseURL = baseUrl;
  }

  async handlePost(url: string, body?: any): Promise<AxiosResponse<any, any>> {
    const response = await this.api.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "app-report",
      },
    });

    return response;
  }
}

export { ApiProvider };
