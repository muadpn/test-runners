"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [url, SetUrl] = useState("");
  const [bodies, setBodies] = useState<any>();
  const [getResponded, setGetResponded] = useState<any>();
  const [postResponded, setPostResponded] = useState<any>();
  async function getDataFromPost() {
    try {
      let dataBody = JSON.stringify(bodies);
      JSON.parse(dataBody);
    } catch (error) {
      toast.error("Please enter a valid JSON");
      return;
    }
    try {
      const data = await fetch("/api/am-i-blocked", {
        method: "POST",
        body: JSON.stringify({
          url: url,
          body: bodies,
        }),
      });
      let dataBody = await data.json();
      setPostResponded(JSON.stringify(dataBody));
    } catch (error) {
      toast.error(JSON.stringify(error));
      setPostResponded(JSON.stringify({ message: "Something went wrong" }));
    }
  }
  return (
    <div className="">
      <div className="w-full flex items-center justify-center flex-col ">
        <div className="my-8">
          <h1>Hey Call this!!</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl max-w-7xl mx-auto  w-full   ">
          <div className="flex w-full items-center  flex-col ">
            <div className="border w-full h-96  my-2 rounded-2xl p-4  ">
              <h3>Response </h3>
              <span className="text-red-600">Not Implimented YET!</span>
            </div>
            <div className="w-full border p-4 rounded-2xl ">
              <div className="my-4 w-full max-w-sm">
                <label htmlFor="url-id">Url</label>
                <Input
                  id="url-id"
                  name="url"
                  placeholder="Enter the URL"
                  onChange={(e) => SetUrl(e.target.value)}
                />
              </div>
              <Button>GET DATA FROM GET</Button>
            </div>
          </div>
          <div className="flex w-full items-center justify-between flex-col ">
            <div className="border  w-full max-h-96 h-96 overflow-scroll   my-2 rounded-2xl p-4 scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary ">
              <h3 className="mb-2 text-green-600">Response from POST</h3>
              <div className="prose-slate">
                <code className="">{postResponded}</code>
              </div>
            </div>
            <div className="w-full border p-4 rounded-2xl">
              <div className="my-4 w-full max-w-sm">
                <div className="my-4">
                  <label htmlFor="url-id">Url</label>
                  <Input
                    id="url-id"
                    name="url"
                    placeholder="Enter the URL"
                    onChange={(e) => SetUrl(e.target.value)}
                    value={url}
                  />
                </div>
                <div>
                  <label htmlFor="body-id">JSON</label>
                  <Textarea
                    id="body-id"
                    name="body"
                    placeholder="Enter the body"
                    onChange={(e) => setBodies(e.target.value)}
                    value={bodies}
                  />
                </div>
              </div>
              <Button onClick={() => getDataFromPost()}>
                GET DATA FROM GET
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
