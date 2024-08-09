import {ChatGroq} from "@langchain/groq"
import {ChatPromptTemplate} from "@langchain/core/prompts"
import dotenv from "dotenv"
import promptsync from "prompt-sync"
import {StringOutputParser} from "@langchain/core/output_parsers"
import {InMemoryChatMessageHistory} from "@langchain/core/chat_history"
import {RunnableWithMessageHistory} from "@langchain/core/runnables"

dotenv.config();
let input = promptsync({sigint:true})

let model = new ChatGroq({
    model:"llama-3.1-8b-instant",
    temperature:0
})

let parser = new StringOutputParser();

let systemtemplate = "You are computer science mentor who helps with the doubts of his mentees. You must help them clear their douts."
let prompt = ChatPromptTemplate.fromMessages([
    ["system",systemtemplate],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"]
])

let chain = prompt.pipe(model).pipe(parser);
let messageHistories :Record<string, InMemoryChatMessageHistory> = {}
const config = {
    configurable: {
      sessionId: "abc2",
    },
};
  
let withMessageHistory = new RunnableWithMessageHistory({
    runnable:chain,
    getMessageHistory: async (sessionid)=>{
        if(messageHistories[sessionid] === undefined){
            messageHistories[sessionid] = new InMemoryChatMessageHistory()
        }
        return messageHistories[sessionid];
    },
    inputMessagesKey:"input",
    historyMessagesKey:"chat_history"
})
async function main(){
    let text = input(">>>")
    let response = await withMessageHistory.invoke(
        {input:text},
        config
    )
    console.log(response)
    main()
}
console.log("ctrl+c to exit\n")
main();