import { DataSource } from "typeorm";
import { Photo } from "./PhotoModel";
import { User } from "./USerModel";

const appSource = new DataSource({
  type: "sqlite",
  database: "./features/database.db",
  entities: [User, Photo],
  synchronize: true,
});

let isInit = false;

console.log("out", isInit);

export const init = async () => {
  if (isInit) return appSource;
  const ap = await appSource.initialize().then((src) => {
    isInit = true;
    return src;
  });
  return ap;
};

export default appSource;
