import {ChatGroq} from '@langchain/groq'
import {StringOutputParser} from '@langchain/core/output_parsers'
import dotenv from "dotenv"

dotenv.config()

let parser = new StringOutputParser();

let model = new ChatGroq({
    model: "llama-3.1-8b-instant",
    temperature: 0
}) 

async function ai(){
    let chain = await model.pipe(parser)
    let result = await chain.invoke('hello')
    console.log(result);
}

ai();