import React, { JSX, Suspense } from 'react';
import { Field, RichText as ContentSdkRichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = ComponentProps & {
  fields: Fields;
};

const MyComponent = async () => {
  let text = '';
  await new Promise(resolve => setTimeout(() => {
    text = (Math.floor(Math.random() * 100) + 1).toString();
    resolve(true);
  }, 3000));
  console.log('SERVER COMPONENT RENDERED');
  return text;
}

export const Default = ({ params, fields }: RichTextProps): JSX.Element => {
  const { RenderingIdentifier, styles } = params;

  return (
    <div className={`component rich-text ${styles}`} id={RenderingIdentifier}>
      <div className="component-content">
        {fields ? (
          <ContentSdkRichText field={fields.Text} />
        ) : (
          <span className="is-empty-hint">Rich text</span>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <MyComponent />
        </Suspense>
      </div>
    </div>
  );
};
