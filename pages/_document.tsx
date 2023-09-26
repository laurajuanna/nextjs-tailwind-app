import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>
    }
  }

  render() {
    return (
      <Html lang="es" className='purple-dark text-foreground bg-background'>
        <Head />
        <body className='purple-dark text-foreground bg-background'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument