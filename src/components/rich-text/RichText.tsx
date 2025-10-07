import React, { JSX, Suspense } from "react";
import {
  Field,
  RichText as ContentSdkRichText,
} from "@sitecore-content-sdk/nextjs";
import { ComponentProps } from "lib/component-props";

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = ComponentProps & {
  fields: Fields;
};

const MyComponent = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Fetch random number from API
    const response = await fetch(
      "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new",
      { cache: "no-store" }
    );
    const randomNumber = await response.text();
    console.log("SERVER COMPONENT RENDERED");
    return <div>{randomNumber.trim()}</div>;
  } catch (error) {
    console.error("Error fetching random number:", error);
    // Fallback to local generation if API fails
    // throw error;
    return <div>Error fetching random number</div>;
  }
};

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
