import Head from 'next/head';
import React from 'react';
import {
  Section, Container, Title, Subtitle,
} from 'bloomer';

export default function Home() {
  return (
    <div className="app">
      <Head>
        <title>喵</title>
      </Head>

      <Section>
        <Container>
          <Title>喵。</Title>
          <Subtitle>看起來 Next.js 設定的很好。</Subtitle>
        </Container>
      </Section>
    </div>
  );
}
