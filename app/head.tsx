import Title from '@src/seo/Title';

export default function RootHead() {
  return (
    <>
      <Title />
      <meta charSet="utf-8" />
      {/* TODO: Bunlar eğer diğer ekranlar direkt açılırsa gelmiyor. */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#fff" />
    </>
  );
}
