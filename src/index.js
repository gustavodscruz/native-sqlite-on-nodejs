import { createServer } from "node:http";
import { setTimeout } from "node:timers/promises";
import bricks from "sql-bricks";

import { select, insert } from "./db.js";
import { once } from "node:events";

createServer(async (request, response) => {
  if (request.method == "GET") {
    console.log("get realizado com sucesso!");
    const query = bricks
      .select("name, phone")
      .orderBy("name")
      .from("students")
      .toString();
    const items = select(query);
    return response.end(JSON.stringify(items));
  }
  if (request.method === "POST") {
    const item = JSON.parse(await once(request, "data"))
    insert({table: 'students', items: [item]})

    response.end(JSON.stringify({
        message: `Student: ${item.name} created with sucess!`
    }))
    1;
  }
}).listen(3000, () => console.log("server runnning at 3000"));

await setTimeout(500);
{
    const result = await (await fetch("http://localhost:3000", {
        method: 'POST', 
        body: JSON.stringify({
            name: 'jaum baum', 
            phone: '231313131'
        })
    })).json();
    console.log("POST", result);
}
{
  const result = await (await fetch("http://localhost:3000")).json();
  console.log("GET", result);
}
