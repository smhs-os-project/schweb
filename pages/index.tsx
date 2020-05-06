import React from 'react';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { GetStaticProps } from 'next';
import Parser from 'rss-parser';
import { Title, Section } from 'bloomer';
import Navbar from '../component/navbar';
import Announcement from '../component/announce';

interface IProps {
  rss: Parser.Output;
}

export default function Home({ rss }: IProps) {
  return (
    <div className="schweb-home">
      <Navbar siteTitle="總覽" />
      <Section>
        <Columns>
          <Column>
            <Title>
              We are hiring!
            </Title>
          </Column>
          <Column>
            <Announcement rss={rss} />
          </Column>
        </Columns>
      </Section>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps: GetStaticProps = async (_ctx) => {
  const parser = new Parser();
  const rssGuid = 'b733b7d5-2704-70be-b2c2-94180a804674';
  const rss = await parser.parseURL(`http://www.smhs.kh.edu.tw/RssXml.php?Guid=${rssGuid}`);

  return {
    props: {
      rss,
    },
  };
};
