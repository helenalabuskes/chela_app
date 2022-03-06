import React, {useCallback, useState} from 'react';
import {AccountConnection, Link} from '@shopify/polaris';

/*export default function AccountConnectionExample() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'Jane Appleseed' : '';

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, [connected]);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
      <Link url="Example App">terms and conditions</Link>. You’ll pay a
      commission rate of 15% on sales made through Sample App.
    </p>
  );*/

  

class AccountConnectionWork extends React.Component {
    static contextType = Context;
    
    // A constructor that defines selected items and nodes
    constructor(props) {
      super(props);
      this.state = {
        selectedItems: [],
        selectedNodes: {},
      };
      const [connected, setConnected] = useState(false);
      const accountName = connected ? 'Jane Appleseed' : '';
    
      const handleAction = useCallback(() => {
        setConnected((connected) => !connected);
      }, [connected]);
    
      const buttonText = connected ? 'Disconnect' : 'Connect';
      const details = connected ? 'Account connected' : 'No account connected';
      const terms = connected ? null : (
        <p>
          By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
          <Link url="Example App">terms and conditions</Link>. You’ll pay a
          commission rate of 15% on sales made through Sample App.
        </p>
      );
    
    }
  
    render() {
      const app = this.context;
  
  
            /*return (
              <>
                <Card>
                  <ResourceList
                    showHeader
                    resourceName={{ singular: "Product", plural: "Products" }}
                    items={data.nodes}
                    selectable
                    selectedItems={this.state.selectedItems}
                    onSelectionChange={(selectedItems) => {
                      const selectedNodes = {};
                      selectedItems.forEach(
                        (item) => (selectedNodes[item] = nodesById[item])
                      );*/
                      return (
                        <AccountConnection
                          accountName={accountName}
                          connected={connected}
                          title="Example App"
                          action={{
                            content: buttonText,
                            onAction: handleAction,
                          }}
                          details={details}
                          termsOfService={terms}
                        />
                      );
                    
  
                    
      
    }
  }
  
  export default AccountConnectionWork;
  






