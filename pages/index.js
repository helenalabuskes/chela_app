import React from "react";
import ReactDOM from "react-dom";
import {AppProvider} from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Page, Layout, EmptyState, Button, Card } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import store from "store-js";
import ResourceListWithProducts from "./components/ResourceList";
import AccountConnectionWork from "./components/AccountConnection";
import { useEffect } from "react";
import { useRouter } from "next/router";

import App from "./_app"
import "@shopify/polaris/dist/styles.css";


  //ReactDOM.render(<AppProvider i18n={en} theme={{colorScheme: "light"}}><App /></AppProvider>, document.getElementById("root"));
/* APOLLOSERVERANDCLIENTAUTH
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(ViewerQuery)
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect])

  if (error) {
    return <p>{error.message}</p>
  }

  if (viewer) {
    return (
      <div>
        You're signed in as {viewer.email} goto{' '}
        <Link href="/about">
          <a>about</a>
        </Link>{' '}
        page. or{' '}
        <Link href="/signout">
          <a>signout</a>
        </Link>
      </div>
    )
  }

  return <p>Loading...</p>
}
 */

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

class Index extends React.Component {
  state = { open: false };
  render() {
    // A constant that defines your app's empty state
    const emptyState = !store.get("ids");
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: "Select products",
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        <Layout>
          <Layout.Section>
            <Card title="Online store dashboard" sectioned>
              <p>View a summary of your online store’s performance.</p>
            </Card>
          </Layout.Section>
        </Layout>
        

        {emptyState ? ( // Controls the layout of your app's empty state
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: "Select products",
                onAction: () => this.setState({ open: true }),
              }}
              image={img}
            >
              <p>Select products to change their price temporarily.</p>
            </EmptyState>
          </Layout>
        ) : (
          // Uses the new resource list that retrieves products by IDs
          <ResourceListWithProducts />
         
        )} : (
          <AccountConnectionWork />
        )
        
      </Page>
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set("ids", idsFromResources);
  };
}

export default Index;
