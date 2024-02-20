import '../styles/globals.css';

import Providers from 'components/Providers';
import type {Metadata} from 'next';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
