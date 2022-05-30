import { container } from "tsyringe";

import { IApiProvider } from "./IApiProvider";
import { ApiProvider } from "./implementations/ApiProvider";

container.registerSingleton<IApiProvider>("ApiProvider", ApiProvider);
