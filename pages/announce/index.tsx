/* eslint-disable react/no-danger */ // 來源就是 HTML，沒辦法（攤手）
/**
 * SMHS 校內公告瀏覽系統
 * https://github.com/youualan87/smhs-rss-reader
 *
 * @author youualan87, pan93412
 */

import { GetStaticProps } from 'next';
import Parser from 'rss-parser';
import React, { FormEvent } from 'react';
import Head from 'next/head';
import {
  Section, Container, Title, CardContent, Column, Subtitle,
  LevelRight, LevelItem, Field, Control, Input,
} from 'bloomer';
import { Card } from 'bloomer/lib/components/Card/Card';
import { Content } from 'bloomer/lib/elements/Content';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Level } from 'bloomer/lib/components/Level/Level';
import { LevelLeft } from 'bloomer/lib/components/Level/LevelLeft';
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter';
import { CardFooterItem } from 'bloomer/lib/components/Card/Footer/CardFooterItem';

const rssGuid = 'b733b7d5-2704-70be-b2c2-94180a804674';

interface IProps {
  rss: Parser.Output;
}

interface IState {
  rssItems: Parser.Item[];
}

interface ISummaryCardProps {
  title?: string;
  body?: string;
  pubDate?: string;
}

export function AnnoSummaryCard(props: ISummaryCardProps) {
  const { title, pubDate, body } = props;

  return (
    <Card>
      <CardContent>
        <Title isSize={3}>{title || '未命名公告'}</Title>
        <div style={{ fontSize: '0.6em', color: 'lightgray' }}>
          {pubDate || ''}
        </div>
        <Content
          style={{
            maxHeight: '6em',
            overflow: 'auto',
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: body || '',
            }}
          />
        </Content>
      </CardContent>
      <CardFooter>
        <CardFooterItem>
          設定
        </CardFooterItem>
      </CardFooter>
    </Card>
  );
}

function substrFind(str1: string, str2: string) {
  if (str1.includes(str2)) return true;
  return false;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Announcement extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { rss } = this.props;
    this.state = {
      rssItems: rss.items || [],
    };

    this.search = this.search.bind(this);
  }

  search(e: FormEvent<HTMLInputElement>) {
    const { rss } = this.props;
    const rssItems = rss.items || [];
    const { value } = e.currentTarget;

    this.setState({
      rssItems: rssItems.filter((item) => {
        if (value === '') return true;
        if (
          substrFind(item.title || '', value)
          || substrFind(item.content || '', value)
        ) return true;
        return false;
      }),
    });
  }

  render() {
    const { rssItems } = this.state;

    return (
      <div>
        <Head>
          <title>schweb // 校內公告</title>
        </Head>

        <Section>
          <Container style={{ marginBottom: '1em' }}>
            <Title>校內公告</Title>
          </Container>
          <Container>
            <Level>
              <LevelLeft>
                <Subtitle tag="p" isSize={5}>
                  <strong>{rssItems.length}</strong>
                  {' '}
                  則公告
                </Subtitle>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <Field hasAddons>
                    <Control>
                      <Input onChange={this.search} placeholder="搜尋公告..." />
                    </Control>
                  </Field>
                </LevelItem>
              </LevelRight>
            </Level>
            <Columns isMultiline>
              {
                rssItems
                  ? rssItems.map((item) => (
                    <Column isSize="1/2">
                      <AnnoSummaryCard
                        title={item.title}
                        body={item.content}
                        pubDate={item.pubDate}
                      />
                    </Column>
                  ))
                  : <Column isSize="1/2"><p>Weird. 無法取得任何資料，請將此問題回報給我們。</p></Column>
              }
            </Columns>
          </Container>
        </Section>
      </div>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps: GetStaticProps = async (_ctx) => {
  const parser = new Parser();
  const rss = await parser.parseURL(`http://www.smhs.kh.edu.tw/RssXml.php?Guid=${rssGuid}`);

  return {
    props: {
      rss,
    },
  };
};
