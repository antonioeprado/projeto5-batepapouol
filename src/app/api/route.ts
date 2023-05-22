import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/participants`;

export async function GET() {
    const res = await axios.get(baseUrl);

    return res.data;
}

export async function POST(name: string) {
    const res = await axios.post(baseUrl, { name });

    return res.data;
}
