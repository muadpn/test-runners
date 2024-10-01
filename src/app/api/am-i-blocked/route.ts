import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
    }
    const data = await fetch(url, {
      method: "GET",
    });
    const RecievedEndpointData = await data.json();
    return NextResponse.json(
      { message: RecievedEndpointData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log(reqBody.body);
    const formData = new FormData();
    formData.append(
      "data",
      reqBody.body ??
        JSON.stringify({ customizable: true, filters: {}, search: "" })
    );
    console.log(formData);
    let data = await axios.post(
      reqBody.url,
      formData
    );
    let recievedData = data.data;
    console.log(recievedData);
    return NextResponse.json({ message: recievedData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 405 }
    );
  }
}
