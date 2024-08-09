import {ChatGroq} from '@langchain/groq'
import {StringOutputParser} from '@langchain/core/output_parsers'
import dotenv from "dotenv"

dotenv.config()

let parser = new StringOutputParser();

let model = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0
}) 

async function ai(){
    let message = await model.invoke("hello")
    let result = await parser.invoke(message);
    console.log(result);
}

ai();