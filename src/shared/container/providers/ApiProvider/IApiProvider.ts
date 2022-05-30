/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";

interface IApiProvider {
  handlePost(url: string, body?: any): Promise<AxiosResponse<any, any>>;
}

export { IApiProvider };
