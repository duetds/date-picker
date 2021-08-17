import { parseISODate, printISODate } from "./date-utils";
const isoAdapter = { parse: parseISODate, format: printISODate };
export default isoAdapter;
