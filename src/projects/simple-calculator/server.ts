import { WebServer, WebAcceptor } from "tgrid/protocols/web";
import { Calculator } from "./internal/Calculator";

async function main(): Promise<void>
{
    let server: WebServer = new WebServer();
    await server.open(10101, async (acceptor: WebAcceptor) =>
    {
        await acceptor.accept(new Calculator());
    });
}
main();