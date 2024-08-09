import {ChatGroq} from '@langchain/groq'
import {StringOutputParser} from '@langchain/core/output_parsers'
import {ChatPromptTemplate} from "@langchain/core/prompts"
import dotenv from "dotenv"

dotenv.config()

let parser = new StringOutputParser();

let model = new ChatGroq({
    model: "llama-3.1-8b-instant",
    temperature: 0
}) 

let systemtemplate = "You are computer science mentor who helps with the doubts of his mentees. You must help them clear their douts."

let prompt = ChatPromptTemplate.fromMessages([
    ["system",systemtemplate],
    ["user","{text}"]
])

async function main(){
    let chain = await prompt.pipe(model).pipe(parser)
    let result = await chain.invoke({text:'hello'})
    console.log(result);
}

main();