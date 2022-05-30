import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("$nt#UI&HuMMb0", 8);

  await connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        id,
        password,
        name: "Administrador",
        email: "admin@email.com",
        is_admin: true,
      },
    ])
    .execute();

  await connection.close();
}

create().then(() => console.log("User admin created!"));
