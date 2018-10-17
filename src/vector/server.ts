import { Vector } from "tstl/container";
import { WebServer, WebAcceptor } from "tgrid/protocol/web";

function main(): void
{
    let server = new WebServer();
    server.open(10100, async (acceptor: WebAcceptor) =>
    {
        await acceptor.accept();
        await acceptor.listen(new Vector<number>());
    });
}
main();