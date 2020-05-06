/* eslint-disable react/no-danger */ // 來源就是 HTML，沒辦法（攤手）
/**
 * SMHS 校內公告瀏覽系統
 * https://github.com/youualan87/smhs-rss-reader
 *
 * @author youualan87, pan93412
 */

import Parser from 'rss-parser';
import React, { FormEvent } from 'react';
import {
  Container, Title, CardContent, Column, Subtitle,
  LevelRight, LevelItem, Field, Control, Input,
} from 'bloomer';
import { Card } from 'bloomer/lib/components/Card/Card';
import { Content } from 'bloomer/lib/elements/Content';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Level } from 'bloomer/lib/components/Level/Level';
import { LevelLeft } from 'bloomer/lib/components/Level/LevelLeft';
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter';
import { CardFooterItem } from 'bloomer/lib/components/Card/Footer/CardFooterItem';

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
  url?: string;
}

export function AnnoSummaryCard(props: ISummaryCardProps) {
  const {
    title, pubDate, body, url,
  } = props;

  return (
    <Card>
      <CardContent>
        <Title isSize={3}>
          {title || '未命名公告'}
          <br />
          <small style={{ fontSize: '0.4em', color: 'lightgray' }}>
            {pubDate || ''}
          </small>
        </Title>
        <Content
          style={{
            maxHeight: '10em',
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
        <CardFooterItem href={url || ''}>
          瀏覽完整公告
        </CardFooterItem>
      </CardFooter>
    </Card>
  );
}

function substrFind(str1: string, str2: string) {
  let isFound = false;

  str2.split(' ').forEach((t) => {
    if (str1.includes(t)) isFound = true;
  });

  return isFound;
}

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
                    url={item.link}
                  />
                </Column>
              ))
              : <Column isSize="1/2"><p>Weird. 無法取得任何資料，請將此問題回報給我們。</p></Column>
          }
        </Columns>
      </Container>
    );
  }
}
