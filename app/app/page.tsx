'use client';

import SnippetInput from '@/feature/snippet/snippetInput';
import Logo from '@/components/Logo';

import SnippetOutput from '@/feature/snippet/snipptOutput';
import SettingBox from '@/feature/setting/settingBox';
import { Provider } from 'react-redux';
import store from '@/store';

export default function Home() {
  return (
    <main className='flex md:flex-col h-screen'>
      <Provider store={store}>
        <section className='flex flex-col flex-1 bg-gray-100'>
          <div className='flex flex-col items-center pt-5 h-full gap-5  overflow-y-scroll'>
            <h1 className='inline'>
              <Logo />
            </h1>
            <SnippetOutput />
          </div>
        </section>
        <section className='flex-1 bg-gray-100'>
          <div className='flex flex-col gap-5 pt-5 h-full justify-center items-center'>
            <SnippetInput />
            <SettingBox />
          </div>
        </section>
      </Provider>
    </main>
  );
}
