import React from 'react';
import {IntroductionPage, FeatureCard} from '@shopify/channels-ui';

export default function MyIntroductionPage() {
  const handleAction = () => {
    // redirect merchants to the onboarding page for the feature
  };

  return (
    <IntroductionPage title="Get started with the Mockingbird channel">
      <FeatureCard
        title="Sell your products on Mockingbird"
        feature="Mockingbird Shopping"
        portrait
        description="Let customers discover and purchase your products directly on Mockingbird."
        badgeText="Free"
        primaryAction={{
          content: 'Start setup',
          onAction: handleAction,
        }}
      >
        <img
          width="100%"
          src="https://burst.shopifycdn.com/photos/laptop-from-above.jpg?width=750&format=pjpg"
        />
      </FeatureCard>
    </IntroductionPage>
  );
}