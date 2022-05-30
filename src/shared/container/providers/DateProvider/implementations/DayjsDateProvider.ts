import dayjs from "dayjs";
import customParserFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(customParserFormat);
dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  private TYPEORM_DATE_ONLY_FORMAT = "YYYY-MM-DD";
  private DATE_ONLY_FORMAT_BR = "DD/MM/YYYY";
  private DATETIME_ONLY_FORMAT = "YYYY-MM-DD HH:mm:ss";

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  subtractDays(days: number): Date {
    return dayjs().subtract(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  subtractHours(hours: number): Date {
    return dayjs().subtract(hours, "hour").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  dateFormat(date: string): string {
    const dateAtual = dayjs(date, "DD/MM/YYYY").toDate();
    const dateInput = dayjs(dateAtual).format("YYYY-MM-DD");

    return dateInput;
  }

  dateFormatBr(date: string): string {
    const dateAtual = dayjs(date, "YYYY-MM-DD").toDate();
    const dateInput = dayjs(dateAtual).format("DD/MM/YYYY");

    return dateInput;
  }

  filtroDate(dateDe: string, dataExec?: string): string[] {
    const dataExecAtual = this.convertToUTC(new Date(dataExec)).split("T");
    const dateAtual = this.convertToUTC(new Date(dateDe)).split("T");

    const dateAtualDe = this.dateFormatBr(dateAtual[0]);
    const horaAtualDe = dateAtual[1].split("-")[0];

    const dateAtualAte = this.dateFormatBr(dataExecAtual[0]);
    const horaAtualAte = dataExecAtual[1].split("-")[0];

    return [dateAtualDe, horaAtualDe, dateAtualAte, horaAtualAte];
  }

  dateTimeFormat(date: string, time: string): string {
    const dateAtual = dayjs(`${date} ${time}`, "DD/MM/YYYY HH:mm:ss").toDate();
    const dateInput = dayjs(dateAtual).format("YYYY-MM-DD HH:mm:ss");

    return dateInput;
  }

  setDateOnly(date: string, time?: string): string {
    if (date && time) {
      const dateTime = this.dateTimeFormat(date, time);
      return dateTime;
    }
    return undefined;
  }

  getDateOnly(stringDate: string): Date | undefined {
    if (stringDate) {
      return new Date(`${stringDate}T00:00:00`);
    }
    return undefined;
  }

  getTimestampOnly(stringDate: string): Date | undefined {
    if (stringDate) {
      return new Date(`${stringDate}`);
    }
    return undefined;
  }

  formatDateOnly(date?: Date): string | undefined {
    if (date) {
      return dayjs(date).format(this.TYPEORM_DATE_ONLY_FORMAT);
    }
    return undefined;
  }

  formatDateOnlyBr(date?: Date): string | undefined {
    if (date) {
      return dayjs(date).format(this.DATE_ONLY_FORMAT_BR);
    }
    return undefined;
  }

  formatTimestampOnly(date?: Date): string | undefined {
    if (date) {
      return dayjs(date).format(this.DATETIME_ONLY_FORMAT);
    }
    return undefined;
  }
}

export { DayjsDateProvider };
