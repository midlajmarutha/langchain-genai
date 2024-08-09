import {ChatGroq} from "@langchain/groq"
import {ChatPromptTemplate} from "@langchain/core/prompts"
import dotenv from "dotenv"
import promptsync from "prompt-sync"
import {StringOutputParser} from "@langchain/core/output_parsers"

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
    ["user", "{text}"]
])

let chain = prompt.pipe(model).pipe(parser);
async function main(){
    let text = input(">>>>>")
    let result = await chain.invoke({text:text})
    console.log(result)
    main()
}

main();