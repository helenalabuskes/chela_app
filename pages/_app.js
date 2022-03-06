import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import ReactDOM from "react-dom";
import { ExtendedAppProvider } from "@shopify/channels-ui";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import channelsUiTranslations from "@shopify/channels-ui/locales/en.json";
import React, {useCallback, useState} from 'react';
import {AccountConnection, Liink} from '@shopify/polaris';

/* APOLLOSERVERANDCLIENTAUTH
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
} */

/*export function AccountConnectionExample() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? "CHELA" : "";
  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, [connected]);
  const buttonText = connected ? "Disconnect" : "Connect";
  const details = connected ? "Account connected" : "No account connected";
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Sample App’s{" "}
      <Link url="CHELA account">terms and conditions</Link>. You’ll pay a
      commission rate of 20% on sales made through Sample App.
    </p>
  );
  return (
    <AccountConnection
      accountName={accountName}
      connected={connected}
      title="CHELA account"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
    />
  );
<<<<<<< HEAD
<<<<<<< HEAD
}*/
=======
=======
>>>>>>> parent of 998c5b8 (sunday group)
}
>>>>>>> parent of 998c5b8 (sunday group)

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, host } = this.props;
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            host: host,
            forceRedirect: true,
          }}
        >
          <MyProvider Component={Component} {...pageProps} />
        </Provider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default MyApp;
