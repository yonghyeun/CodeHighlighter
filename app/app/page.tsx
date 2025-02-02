"use client";

import SnippetInput from "@/feature/snippet/snippetInput";
import Logo from "@/components/Logo";
import Introduction from "@/components/Introduce";

import SettingBox from "@/feature/setting/settingBox";
import SnippetOutput from "@/feature/snippet/snippetOutput";

import { StoreProvider } from "@/store";
import {
  CopySnippetToClipboardButton,
  DownLoadSnippetToSVGButton,
} from "@/src/features/snippet/ui";

export default function Home() {
  return (
    <main className="flex md:flex-col min-h-screen">
      <StoreProvider>
        <section className="flex flex-col flex-1 bg-slate-900 md:bg-black-100 overflow-x-scroll output ">
          <div className="flex flex-col items-center  h-full gap-5  overflow-scroll output">
            <h1 className="inline">
              <Logo />
            </h1>
            <section className="flex flex-col items-center w-full">
              <div className=" flex w-[90%] px-[1.5rem] mb-2 gap-[0.5rem] justify-end">
                <CopySnippetToClipboardButton />
                <DownLoadSnippetToSVGButton />
              </div>
              <SnippetOutput />
              <Introduction />
            </section>
          </div>
        </section>
        <section className="flex-1 bg-slate-900">
          <div className="flex flex-col gap-5  h-full justify-center items-center">
            <SnippetInput />
            <SettingBox />
          </div>
        </section>
      </StoreProvider>
    </main>
  );
}
