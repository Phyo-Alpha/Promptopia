import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();

        const tag = request.nextUrl.searchParams.get('tag');

        const prompts = await Prompt.find({}).populate('creator');

        if (tag) {
            const filteredPrompts = prompts.filter(prompt => prompt.tag.includes(tag));
            return new Response(JSON.stringify(filteredPrompts), { status: 200 });
        }

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch Prompts", { status: 500 })
    }
}