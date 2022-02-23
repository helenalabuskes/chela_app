import React, {useState} from 'react';
import {
  OnboardingPage,
  OnboardingCard,
  AccountConnection,
} from '@shopify/channels-ui';
import {Stack, Button, Link} from '@shopify/polaris';

export default function MyOnboardingPage() {
  // setup states to track user completion for this example
  // onboarding completion should be tracked in your database
  const [accountConnected, setAccountConnected] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleBreadcrumbAction = () => {
    // redirect merchant to introduction page
  };

  const handleAccountConnect = () => {
    // surface your platform's authentication in a modal or popup
    setAccountConnected(true);
  };

  const handleAccountDisconnect = () => {
    // disconnect account in your database
    setAccountConnected(false);
    setTermsAccepted(false);
  };

  const handleTermsAccept = () => {
    // persist that the terms are accepted in your database
    setTermsAccepted(true);
  };

  const handleFinishSetup = () => {
    // perist that the onboarding is complete in your database
    // redirect merchant to overview page
  };

  // setup state of the onboarding steps
  const accountState = accountConnected ? 'completed' : 'active';
  let termsState = 'disabled';
  if (accountConnected && !termsAccepted) {
    termsState = 'active';
  } else if (termsAccepted) {
    termsState = 'completed';
  }

  // set AccountConnection props based on whether an account has been connected
  const accountConnectionProps = accountConnected
    ? {
        content: 'example@mockingbird.com', // an identifier for the account on your platform
        avatar:
          'https://burst.shopifycdn.com/photos/fashion-model-in-fur.jpg?width=373', // thumbnail representation of the account on your platform (optional)
        action: {
          content: 'Disconnect',
          onAction: handleAccountDisconnect,
        },
        connected: true,
      }
    : {
        content: 'No account connected',
        action: {
          content: 'Connect account',
          onAction: handleAccountConnect,
        },
        connected: false,
      };

  return (
    <OnboardingPage
      title="Set up Mockingbird Shopping"
      breadcrumb={{
        onAction: handleBreadcrumbAction,
      }}
      action={{
        content: 'Finish setup',
        disabled: !termsAccepted,
        onAction: handleFinishSetup,
      }}
    >
      <OnboardingCard
        id="account-connection"
        title="Connect your Mockingbird account"
        state={accountState}
        footer="This account is needed to sync your products to Mockingbird"
      >
        <AccountConnection {...accountConnectionProps} />
      </OnboardingCard>
      <OnboardingCard
        id="terms"
        title="Accept the terms of service"
        state={termsState}
        sectioned
      >
        <Stack vertical>
          <p>
            In order to complete set up, you need to read and agree to{' '}
            <Link>Mockingbird Merchant Terms of Service</Link> and{' '}
            <Link>Mockingbird Shopping Terms of Service</Link>
          </p>
          <Stack distribution="trailing">
            <Button primary onClick={handleTermsAccept}>
              Accept
            </Button>
          </Stack>
        </Stack>
      </OnboardingCard>
    </OnboardingPage>
  );
}