import { WebConnector } from "tgrid/protocols/web";
import { Driver } from "tgrid/components";

import { Scanner } from "../../utils/Scanner";
import { IChatService } from "../../controllers/IChatService";
import { IChatPrinter } from "../../controllers/IChatPrinter";

class ChatPrinter implements IChatPrinter
{
    public talk(name: string, content: string): void
    {
        console.log(`${name}: ${content}`);
    }
}

async function main(): Promise<void>
{
    //----
    // PREPARATIONS
    //----
    // CONNECT WITH LISTENER
    let connector: WebConnector<{}, ChatPrinter> = new WebConnector(new ChatPrinter());
    await connector.connect("ws://127.0.0.1:10103", {});

    // SPECIFY CONTROLLER
    let service: Driver<IChatService> = connector.getDriver<IChatService>();

    //----
    // DO CHAT
    //----
    // SET MY NAME
    let nickname: string;
    while (true)
    {
        nickname = await Scanner.read("Insert your nickname: ");
        if (await service.setName(nickname) === true)
            break;
    }

    // TALK UNTIL QUIT
    while (true)
    {
        let content: string = await Scanner.read(nickname + ": ");
        if (content == "")
            break;

        await service.talk(content);
    }

    // QUIT
    await connector.close();
}
main().catch(exp =>
{
    console.log(exp);
});