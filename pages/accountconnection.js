function AccountConnectionExample() {
    const [connected, setConnected] = useState(false);
    const accountName = connected ? 'CHELA' : '';
  
    const handleAction = useCallback(() => {
      setConnected(connected => !connected);
    }, [connected]);
  
    const buttonText = connected ? 'Disconnect' : 'Connect';
    const details = connected ? 'Account connected' : 'No account connected';
    const terms = connected ? null : <p>
        By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
        <Link url="CHELA account">terms and conditions</Link>. You’ll pay a
        commission rate of 15% on sales made through Sample App.
      </p>;
  
    return <AccountConnection title="CHELA account" action={{
      content: buttonText,
      onAction: handleAction
    }} details={details} termsOfService={terms} connected={true} accountName="CHELA" />;
  }