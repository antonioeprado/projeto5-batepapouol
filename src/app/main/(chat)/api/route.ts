import axios from "axios";
import { VisibilityTypes } from "@/contexts/messagingContext";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

export async function GET(username: string) {
    const res = await axios.get(baseUrl, { headers: { user: username } });

    return res.data;
}

export async function POST(message: MessageInput) {
    const res = await axios.post(baseUrl, message);

    return res.data;
}

type MessageInput = {
    from: string;
    to: string;
    text: string;
    type: VisibilityTypes;
};
