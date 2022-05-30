import { container } from "tsyringe";
import { ValueTransformer } from "typeorm";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

const dateProvider = container.resolve(DayjsDateProvider);
export const dateOnlyTransformer: ValueTransformer = {
  from: (dbValue: any): any => {
    return dateProvider.getDateOnly(dbValue);
  },
  to: (entityValue: any): any => {
    return dateProvider.formatDateOnly(entityValue);
  },
};

export const timestampOnlyTransformer: ValueTransformer = {
  from: (dbValue: any): any => {
    // return dateProvider.getDateOnly(dbValue);
    return dateProvider.getTimestampOnly(dbValue);
  },
  to: (entityValue: any): any => {
    return dateProvider.formatTimestampOnly(entityValue);
  },
};
