
import {NextIntlClientProvider} from 'next-intl';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import '../globals.css';
import { AuthProvider } from "./controlC/HU3/hooks/usoAutentificacion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notFound } from 'next/navigation';
import { TranslationButton } from '@/i18n/TranslationButton';

const messagesMap = {
  en: () => import('../../../messages/en.json'),
  es: () => import('../../../messages/es.json'),
};

export default async function ControlCLayout({
  children,
  params
}: {
  children: ReactNode;
  params:Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loader = messagesMap[locale as keyof typeof messagesMap];
  if (!loader) notFound();
   const messages = (await loader()).default;
  return (
    <html lang={locale}>
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthProvider>
          {children}
          {/* Contenedor global para todos los toasts */}
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            pauseOnHover
            draggable
            theme="colored"
          />
          <div className='text-black fixed bottom-7 right-7'><TranslationButton/></div>
        </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
